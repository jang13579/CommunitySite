const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../../public/home.html"));
});

module.exports = router;
