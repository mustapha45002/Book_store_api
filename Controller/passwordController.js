// import
const joi = require("joi");
const asyncHandler = require("express-async-handler");
const { user,validateChangePasswordUser } = require("../model/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");



/**
 * @desc   Get Forgot password view
 * @route  /password/forgot-password
 * @method Get
 * @access public
 */

let getForgotPasswordView = asyncHandler((req, res) => {
  res.render("forgot-password");
});

/**
 * @desc   send Forgot password Link
 * @route  /password/forgot-password
 * @method post
 * @access public
 */

let sendForgotPasswordLink = asyncHandler(async (req, res) => {
  let TheUSer = await user.findOne({ email: req.body.email });
  if (!TheUSer) {
    return res.send("this user Not Found");
  }
  const secret = process.env.secretKey + TheUSer.password;
  console.log(secret + "=>   1");
  const token = jwt.sign({ email: TheUSer.email, id: TheUSer._id }, secret);

  const link = `http://localhost:5000/password/reset-password/${TheUSer._id}/${token}`;

  // ToDo : send email to the user

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "eng.mustapha45002@gmail.com",
      pass: process.env.pass,
    }
  })
  const mailOptions={
    from:"eng.mustapha45002@gmail.com",
    to:"sasa45002@gmail.com",
    subject:"reset password",
    html:`<div>
      <h4>click on the link below to reset password</h4>
      <p>${link}</p>
    </div>`
  }
transporter.sendMail(mailOptions,function(error,success){
  if(error){
    console.log(error)
    res.send(error)
  }
  else{
    console.log("email sent: "+success.response)
    res.render("link-send")
  }
})


});

/**
 * @desc   Get Reset password view
 * @route  /password/reset-password/:userId/:token
 * @method Get
 * @access public
 */

let getResetPasswordView = asyncHandler(async (req, res) => {
  let TheUSer = await user.findById(req.params.userId);
  if (!TheUSer) {
    return res.send("this user Not Found");
  }
  const secret = process.env.secretKey + TheUSer.password;

  try {
    jwt.verify(req.params.token, secret);
    res.render("reset-password", { email: TheUSer.email });
  } catch (error) {
    console.log(error);
    res.send({ message: "one error" });
  }
});

/**
 * @desc   Reset password the password
 * @route  /password/reset-password/:userId/:token
 * @method post
 * @access public
 */

let resetThePassword = asyncHandler(async (req, res) => {
  // to do validation

let {error}=validateChangePasswordUser(req.body)
if(error){
  return res.send("wrong password format")
}


  let TheUSer = await user.findById(req.params.userId);
  if (!TheUSer) {
    return res.send("this user Not Found");
  }
  const secret = process.env.secretKey + TheUSer.password;

  try {
    jwt.verify(req.params.token, secret);
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    TheUSer.password = req.body.password;
    await TheUSer.save();
    res.render("success-password");
  } catch (error) {
    console.log(error);
    res.send({ message: "reset error" });
  }
});

module.exports = {
  getForgotPasswordView,
  sendForgotPasswordLink,
  getResetPasswordView,
  resetThePassword,
};
