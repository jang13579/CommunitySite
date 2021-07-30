const express = require("express");
const router = express.Router();

const mysql = require("mysql");
const config = require("../../../config/index");
const { DBHOST, DBPOST, DBPW } = config;

const Options = {
  host: DBHOST,
  port: DBPOST,
  user: "root",
  password: DBPW,
  database: "communitysite",
};

const connection = mysql.createConnection(Options);

connection.connect();

router.get("/", (req, res, next) => {
  console.log("req.session : ", req.session);
  let query = connection.query(
    "select * from post order by postId desc",
    (err, rows) => {
      if (err) return res.json({ postsSuccess: false, err });
      if (rows.length) {
        return res.json({ postsSuccess: true, rows });
      } else {
      }
    }
  );
});

module.exports = router;