const express = require("express");
const router = express.Router();
const auth = require("./auth/auth");
const register = require("./register/register");
const login = require("./login/login");
const logout = require("./logout/logout");
const googleLogin = require("./googleLogin/googleLogin");
const headerUserName = require("./headerUserName/headerUserName");
const ConfirmPassword = require("./ConfirmPassword/ConfirmPassword");
const MyPage = require("./MyPage/MyPage");
const sendEmail = require("./sendEmail/sendEmail");
const forgetPassword = require("./forgetPassword/forgetPassword");
const logining = require("./logining/logining");

router.use("/auth", auth);
router.use("/register", register);
router.use("/login", login);
router.use("/logout", logout);
router.use("/googleLogin", googleLogin);
router.use("/headerUserName", headerUserName);
router.use("/confirmPassword", ConfirmPassword);
router.use("/MyPage", MyPage);
router.use("/sendEmail", sendEmail);
router.use("/forgetPassword", forgetPassword);
router.use("/logining", logining);

module.exports = router;
