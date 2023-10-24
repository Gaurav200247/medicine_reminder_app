const express = require("express");
const {
  Register,
  Login,
  LogOut,
  LoadUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/User");
const { isAuthRoute } = require("../Middlewares/Auth");

const router = express.Router();

//------------------ public routes ------------------
router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(LogOut);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:resetToken").post(resetPassword);

//------------------ user routes ------------------

router.route("/me").get(isAuthRoute, LoadUser);

module.exports = router;
