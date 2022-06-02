const fs = require("fs");
const iconv = require("iconv-lite");
const mysql = require("mysql2");

const rawFile = fs.readFileSync("레시피+재료정보_20220209.csv");
let utf8Str = iconv.decode(rawFile, "euc-kr");

let index = 0;
const records = [];
let record = "";
let ingredientDict = new Set();
let pk = 1;

// 중복 제거 재료 확보
while (index < utf8Str.length) {
  if (utf8Str[index] !== "\n") record += utf8Str[index];
  else {
    const splitted = record.split(",");
    const ingredient = `"${splitted[2]}"`;
    ingredientDict.add(ingredient);
    record = "";
  }
  index++;
}

Array.from(ingredientDict).forEach((ingredient) => {
  records.push(`${pk},${ingredient}`);
  pk++;
});

// csv 파일 생성
let csv = records.join("\n");
fs.writeFile("ingredients.csv", csv, "utf8", () => {
  console.log("done");
});

const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "typeorm",
  password: "typeormpassword",
  database: "capstone",
});

let query = `(${records.join("),(")})`;
connection.query(
  `
  insert into ingredient (ingredient_id, name) values ${query};
`,
  (err, res) => {
    console.log(err);
    console.log(res);
  }
);
