// server/index.js

const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const mysql = require("mysql2");
const { execSync } = require("child_process");
//const { readFile } = require("fs")

const defgate = execSync("/srv/server/ip.sh").toString().slice(0,-1);
//const staticdir = "/srv/server/static/"

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
//  res.setHeader("Content-Type", "text/plain");
//  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

function sanitize(q) {
  return q.replaceAll(" ","_");
};

app.get("/", (req, res) => {
  res.send(execSync("cat build/index.html"));
});

/*app.get("/favicon.ico", (req,res) => {
  res.setHeader("Content-Type", "image/vnd.microsoft.icon");
  res.send(execSync("cat build/favicon.ico"));
});*/

app.get("/static/:mime/:file", (req,res) => {
  const catline = "cat build/static/"+`${req.params.mime}`+"/mimefile";
  const mimetype = execSync(`${catline}`).toString().slice(0,-1);
  res.setHeader("Content-Type", mimetype);
  res.send(execSync(`cat build/static/${req.params.mime}/${req.params.file}`));
});

app.get("/api/:param1.:param2", (req, res) => {
  res.json({ message: "Serv()r", params: JSON.stringify(req.params) });
});

app.get("/create/:fname.:lname", (req, res) => {
  let sql = `INSERT INTO test (firstname, lastname) VALUES ('${sanitize(req.params.fname)}', '${sanitize(req.params.lname)}');`;
  con.query(sql, function (err, result) {
    if (err) {res.json({ message: "Failed"}); console.log(err);}
    else {res.json({ message: "Created", sqlret: JSON.stringify(result) });}
  });
});

app.get("/read/:id", (req, res) => {
  let sql = `SELECT * FROM test WHERE id = '${sanitize(req.params.id)}';`;
  con.query(sql, function (err, result) {
    if (err) {res.json({ message: "Failed" }); console.log(err);}
    else {res.json({ message: JSON.stringify(result), sqlret: JSON.stringify(result) });}
  });
});

app.get("/update/:id.:fname.:lname", (req, res) => {
  let sql = `UPDATE test SET firstname = '${sanitize(req.params.fname)}', lastname = '${sanitize(req.params.lname)}' WHERE id = '${sanitize(req.params.id)}';`;
  con.query(sql, function (err, result) {
    if (err) {res.json({ message: "Failed"}); console.log(err);}
    else {res.json({ message: "Updated", sqlret: JSON.stringify(result), q: sql });}
  });
});

app.get("/delete/:id", (req, res) => {
  let sql = `DELETE FROM test WHERE id = '${sanitize(req.params.id)}';`;
  con.query(sql, function (err, result) {
    if (err) {res.json({ message: "Failed"}); console.log(err);}
    else {res.json({ message: "Deleted", sqlret: JSON.stringify(result) });}
  });
});

app.get("/reset", (req, res) => {
  let sqldrop = 'DROP TABLE test;'
  let sqlrm = 'CREATE TABLE test.test(id INT AUTO_INCREMENT, firstname VARCHAR(255) NOT NULL DEFAULT "Mr.", lastname VARCHAR(255) NOT NULL DEFAULT "Kitty", PRIMARY KEY(id));'
  con.query(sqldrop, function (err, result) {
    if (err) {console.log(err);}
  });
  con.query(sqlrm, function (err, result) {
    if (err) {console.log(err); res.json({ message: "Failed" });}
    else {res.json({ message: "Reset", sqlret: JSON.stringify(result) });}
  });
});

app.get("/dump", (req, res) => {
  let sql = 'SELECT * FROM test';
  con.query(sql, function(err, result) {
    if (err) {console.log(err); res.json({ message: "Failed" });}
    else {res.json({ message: JSON.stringify(result), sqlret: JSON.stringify(result) });}
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
