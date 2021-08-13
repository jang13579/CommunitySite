const express = require("express");
const router = express.Router();
const postDate = require("../utile");

const mysql = require("mysql");
const config = require("../../../config/index");
const { DBHOST, DBPOST, DBPW } = config;

const Options = {
  host: DBHOST,
  port: DBPOST,
  user: "root",
  password: DBPW,
  database: "communitysite",
  dateStrings: "date",
};

const connection = mysql.createConnection(Options);

connection.connect();

router.get("/", (req, res, next) => {
  console.log("req.session header : ", req.session);
  let query = connection.query(
    "select postId, title, description, category, date, view, name, email, role  from post LEFT JOIN user ON post.writer=user.id order by postId desc",
    (err, rows) => {
      if (err) return res.json({ postsSuccess: false, err });
      if (rows.length) {
        let postDateData = postDate(rows);
        console.log("postDateData : ", postDateData);
        return res.json({ postsSuccess: true, rows, postDateData });
      } else {
      }
    }
  );
});

module.exports = router;