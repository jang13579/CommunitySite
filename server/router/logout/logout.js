const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  req.logout();
  res.redirect("/");
  //   req.session.destroy((err) => {
  //     res.redirect("/");
  //   });
});

module.exports = router;
