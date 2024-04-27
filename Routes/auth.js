const express = require("express");
const authRoute = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");

let {
  user,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
} = require("../model/UserModel");

/**
 * @desc     Register
 * @route    auth/register
 * @method   post
 * @access   public
 */

authRoute.post(
  "/register",
  asyncHandler(async (req, res) => {
    /////// check validation of data
    let { error } = validateRegisterUser(req.body);
    if (error) {
      return res.status(404).send(error.message);
    }
    /////// check if user exist
    let userExist = await user.findOne({ email: req.body.email });
    console.log(userExist);
    if (userExist) {
      return res.send("this user is registerd");
    }

    /////// hash bassword
    var salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    // registe user
    let data = await user.create(req.body);

    // token
    const token=jwt.sign({id:data._id,isAdmin:data.isAdmin},process.env.secretKey,{expiresIn:"4d"})
  
    let { password, ...other } = data._doc;
    res.send({other,token});
  })
);

/**
 * @desc     Login
 * @route    auth/Login
 * @method   post
 * @access   public
 */

authRoute.post(
  "/login",
  asyncHandler(async (req, res) => {
    // check validation
    let { error } = validateLoginUser(req.body);
    if (error) {
      return res.status(404).send(error.message);
    }
    // check if user exist
    let existUser = await user.findOne({ email: req.body.email });
    if (!existUser) {
      res.status(404).send("invalid email or password");
    }
    // match Pasword
    let matchPassword = await bcrypt.compare(
      req.body.password,
      existUser.password
    );
    if (!matchPassword) {
      return res.status(404).send("invalid email or password");
    }
    // jwt
    const token=jwt.sign({id:existUser._id,isAdmin:existUser.isAdmin},process.env.secretKey,{expiresIn:"4d"})
    let { password,userName,email,_id} = existUser._doc;
    res.send({userName,email,token,_id});
  })
);

module.exports = { authRoute };
