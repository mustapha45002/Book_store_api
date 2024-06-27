const express = require("express");
const router = express.Router();
const {
  getForgotPasswordView,
  sendForgotPasswordLink,
  getResetPasswordView,
  resetThePassword,
} = require("../Controller/passwordController");

router.get("/forgot-password", getForgotPasswordView);
router.post("/forgot-password", sendForgotPasswordLink);

//  /password/reset-password/:userId/:token
router
  .route("/reset-password/:userId/:token")
  .get(getResetPasswordView)
  .post(resetThePassword);
module.exports = router;
