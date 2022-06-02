const fs = require("fs");
const iconv = require("iconv-lite");
const mysql = require("mysql2");

function makeDictionary(file, type) {
  const first = type ? 0 : 1;
  const second = type ? 1 : 0;
  let idx = 0;
  let line = "";
  let dictionary = {};
  while (idx < file.length) {
    if (file[idx] !== "\n") {
      line += file[idx];
    } else {
      const splitted = line.split(",");
      dictionary[splitted[first].replace('"', " ").replace('"', " ").trim()] =
        splitted[second];
      line = "";
    }
    idx++;
  }
  return dictionary;
}

// 1. recipePk_old_new.csv를 불러온다
const file1 = fs.readFileSync("recipePk_old_new.csv");
const ufile1 = iconv.decode(file1, "euc-kr");
// 2. 옛날 id : 현재 id 사전을 만든다
const recipeDict = makeDictionary(ufile1, true);

// 3. ingredients.csv를 불러온다
const file2 = fs.readFileSync("ingredients.csv");
const ufile2 = iconv.decode(file2, "euc-kr");
// 4. 재료명 : 현재 id 사전을 만든다
const ingredientDict = makeDictionary(ufile2, false);
console.log(ingredientDict);
// 5. 레시피+재료정보_20220209.csv를 불러온다
// 6. 옛날 레시피 코드, 재료명, 재료 용량 형식의 파일을 만든다
const file3 = fs.readFileSync("레시피+재료정보_20220209.csv");
const ufile3 = iconv.decode(file3, "euc-kr");

// 7. 4번에서 만든 파일에서, '옛날 레시피 코드'를 2번의 사전을 참조해서 업데이트한다.
// 8. 4번에서 만든 파일에서, '재료명'을 4번의 사전을 참조해서 업데이트한다.
let index = 0;
let record = "";
let pk = 1;
const records = [];
while (index < ufile3.length) {
  if (ufile3[index] !== "\n") {
    record += ufile3[index];
  } else {
    const splitted = record.split(",");
    const recipeId = recipeDict[splitted[0]];
    if (recipeId !== undefined) {
      const ingredientId = ingredientDict[splitted[2]];
      const amount = splitted[3];
      records.push(`${pk},${recipeId},${ingredientId},"${amount}"`);
      pk++;
    }
    record = "";
  }
  index++;
}

// csv 파일 생성
const csv = records.join("\n");
fs.writeFile("recipeIngredient.csv", csv, "utf-8", () => {
  console.log("done");
});

const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "typeorm",
  password: "typeormpassword",
  database: "capstone",
});

// 쿼리 생성 & 실행
const length = records.length;
for (let i = 0; i < length / 500; i++) {
  let query = "";
  let j = 0;
  while (records[i * 500 + j] !== undefined) {
    query += `(${records[i * 500 + j]}),`;
    j++;
  }
  query = query.slice(0, query.length - 1);
  connection.query(
    `
          insert into recipe_ingredient (RECIPE_INGREDIENT_ID, recipe_id, ingredient_id, amount) values ${query};
        `,
    (err, res) => {
      console.log(err);
    }
  );
}
