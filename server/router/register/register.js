const express = require("express");
const router = express.Router();

const mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mysql1",
  database: "communitysite",
});

connection.connect();

//console.log("Welcome Mysql Server!!");

const updatapw = (req, res) => {};

router.post("/", (req, res, next) => {
  console.log("reqBack : ", req);
  let user = req.body;
  let email = user.email;
  let name = user.name;
  let password = user.password;
  console.log("useremail", email);
  let query = connection.query(
    "select * from user where email=?",
    [email],
    (err, rows) => {
      if (err) return res.json({ success: false, err });
      if (rows.length) {
        console.log("rows.length", rows.length);
        if (rows[0].email === email) {
          console.log("already user");
        } else if (rows[0].name === name) {
          console.log("already user name");
        }
      } else {
        let sql = {
          email,
          name,
          password,
        };
        let query = connection.query(
          "insert into user set ?",
          sql,
          (err, rows) => {
            if (err) throw err;
            console.log("insert DB data: ", rows.insertId, name);
            if (rows) {
              res.status(200).json({ success: true });
            }
          }
        );
      }
    }
  );
});

module.exports = router;