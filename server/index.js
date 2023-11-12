// server/index.js

const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const mysql = require("mysql2");
const { execSync } = require("child_process");

const defgate = execSync("/srv/server/ip.sh").toString().slice(0,-1);

const con = mysql.createPool({
  host: defgate,
  user: "mysql",
  password: "mysql",
  port: "5555",
  database: "test"
});

app.use((req,res,next) =>
{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

function sanitize(q) {
  return q.replaceAll(" ","_");
};

app.get("/", (req, res) => {
  res.send(execSync("cat /srv/client/index.html").toString());
});

app.get("/api/:param1.:param2", (req, res) => {
  res.json({ message: "Serv()r", params: JSON.stringify(req.params) });
});

app.get("/create/:fname.:lname", (req, res) => {
  let sql = `INSERT INTO test (firstname, lastname) VALUES ('${sanitize(req.params.fname)}', '${sanitize(req.params.lname)}');`;
  con.query(sql, function (err, result) {
    if (err) {res.json({ message: "Failed"}); throw err;}
    else {res.json({ message: "Created", sqlret: JSON.stringify(result) });}
  });
});

app.get("/read/:id", (req, res) => {
  let sql = `SELECT * FROM test WHERE id = '${sanitize(req.params.id)}';`;
  con.query(sql, function (err, result) {
    if (err) {res.json({ message: "Failed" }); throw err;}
    else {res.json({ message: JSON.stringify(result), sqlret: JSON.stringify(result) });}
  });
});

app.get("/update/:id.:fname.:lname", (req, res) => {
  let sql = `UPDATE test SET firstname = '${sanitize(req.params.fname)}', lastname = '${sanitize(req.params.lname)}' WHERE id = '${sanitize(req.params.id)}';`;
  con.query(sql, function (err, result) {
    if (err) {res.json({ message: "Failed"}); throw err;}
    else {res.json({ message: "Updated", sqlret: JSON.stringify(result), q: sql });}
  });
});

app.get("/delete/:id", (req, res) => {
  let sql = `DELETE FROM test WHERE id = '${sanitize(req.params.id)}';`;
  con.query(sql, function (err, result) {
    if (err) {res.json({ message: "Failed"}); throw err;}
    else {res.json({ message: "Deleted", sqlret: JSON.stringify(result) });}
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
