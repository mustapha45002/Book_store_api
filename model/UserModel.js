const mongoose = require("mongoose");
const joi = require("joi");
var jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const passwordComplexity = require("joi-password-complexity")


let userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 35,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid email address format",
      },
    },
    userName: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 35,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// methods
userSchema.methods.generateToken=function () {
  return jwt.sign(
      { id: this._id, isAdmin: this.isAdmin },
      process.env.secretKey,
      { expiresIn: "4d" }
    )
  }



const user = mongoose.model("user", userSchema);





let validateRegisterUser = (data) => {
  schema = joi.object({
    email: joi.string().required().min(5).email(),
    userName: joi.string().required().min(5),
    password: passwordComplexity().required(),
  });

  return schema.validate(data);
};

// update validation function
let validateUpdateUser = (data) => {
  schema = joi.object({
    email: joi.string().min(5).email(),
    userName: joi.string().min(5),
    password: joi.string().min(5),
  });
  return schema.validate(data);
};

// login validation function
let validateLoginUser = (data) => {
  schema = joi.object({
    email: joi.string().min(5).email().required(),
    password: joi.string().min(5).required(),
  });

  return schema.validate(data);
};

// validateChangePasswordUser validation function
let validateChangePasswordUser = (data) => {
  schema = joi.object({
    password: joi.string().min(5).required(),
  });

  return schema.validate(data);
};


module.exports = {
  user,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,validateChangePasswordUser
};
