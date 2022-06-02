const fs = require("fs");
const iconv = require("iconv-lite");
const mysql = require("mysql2");

const rawFile = fs.readFileSync("레시피+기본정보_20220209.csv");
let utf8Str = iconv.decode(rawFile, "euc-kr");

let record = "";
let index = 0;
let pk = 1;
const records = [];

while (index < utf8Str.length) {
  if (utf8Str[index] !== "\n") record += utf8Str[index];
  else {
    const splitted = record
      .match(
        /(?<data>[①②③④⑤⑥⑦⑧⑨⑩\[\]℃~!@#$%^&*\w·:가-힇힌히힉\s\d()\/,%.?=]+)/g
      )
      .filter((chunk) => !(chunk === "," || chunk === ", "));
    const title = splitted[1];
    const referenceUrl = "EMPTY";
    const description = splitted[2];
    const thumbnailUrl = splitted[13];
    const serving = splitted[9].slice(0, 1);
    const userId = 1;
    records.push(
      `${pk},"${title}","${referenceUrl}","${description}","${thumbnailUrl}",${
        Number(serving) + 1
      },${userId}`
    );
    record = "";
    pk++;
  }
  index++;
}

// csv 파일 생성
const csv = records.join("\n");
fs.writeFile("recipes.csv", csv, "utf-8", () => {});

// 쿼리 생성 & 실행
const query = `(${records.join("),(")})`;
console.log(query);
const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "typeorm",
  password: "typeormpassword",
  database: "capstone",
});
connection.query(
  `
  insert into recipe (recipe_id, title, reference_url, description, thumbnail_url, serving, user_id) values ${query};
`,
  (err, res) => {
    console.log(err);
    console.log(res);
  }
);
