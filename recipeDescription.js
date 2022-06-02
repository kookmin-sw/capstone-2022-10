const fs = require("fs");
const iconv = require("iconv-lite");
const mysql = require("mysql2");

function makeDictionary(file, type) {
  const first = type ? 0 : 1;
  const second = type ? 1 : 0;
  let idx = 0;
  let record = "";
  let dictionary = {};
  while (idx < file.length) {
    if (file[idx] !== "\n") {
      record += file[idx];
    } else {
      const splitted = record.split(",");
      dictionary[splitted[first]] = splitted[second];
      record = "";
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

// 6. 설명 id, 옛날 레시피 코드, 설명, 이미지url, 순서
const file2 = fs.readFileSync("레시피+과정정보_20220209.csv");
const ufile2 = iconv.decode(file2, "euc-kr");
let index = 0;
let record = "";
const records = [];
let pk = 1;
while (index < ufile2.length) {
  if (ufile2[index] !== "\n") record += ufile2[index];
  else {
    const splitted = record
      .match(
        /(?<data>[①②③④⑤⑥⑦⑧⑨⑩\[\]℃~!@#$%^&*\w·:가-힇힌히힉\s\d()\/,%.?=]+)/g
      )
      .filter((chunk) => !(chunk === "," || chunk === ", "));

    const oldId = splitted[0];
    const order = splitted[1];
    const description = splitted[2];
    const imageUrl = splitted[3] !== " " ? splitted[3] : "EMPTY";
    if (recipeDict[oldId] !== undefined) {
      records.push(
        `${pk},${recipeDict[oldId]},"${description}","${imageUrl}",${order}`
      );
      pk++;
    }
    record = "";
  }
  index++;
}

// csv 파일 생성
const csv = records.join("\n");
fs.writeFile("recipeDescription.csv", csv, "utf-8", () => {
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
    `insert into recipe_description (RECIPE_DESCRIPTION_ID, RECIPE_ID, IMAGE_DESCRIPTION, IMAGE_URL, DESCRIPTION_ORDER) values ${query};`,
    (err, res) => {
      console.log(err);
    }
  );
}
