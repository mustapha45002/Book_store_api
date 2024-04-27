const mongoose = require("mongoose");
const joi = require("joi");

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
const user = mongoose.model("user", userSchema);

let validateRegisterUser = (data) => {
  schema = joi.object({
    email: joi.string().required().min(5).email(),
    userName: joi.string().required().min(5),
    password: joi.string().required().min(5),
  });

  return schema.validate(data);
};

let validateUpdateUser = (data) => {
  schema = joi.object({
    email: joi.string().min(5).email(),
    userName: joi.string().min(5),
    password: joi.string().min(5),
  });
  return schema.validate(data)
};

let validateLoginUser = (data) => {
  schema = joi.object({
    email: joi.string().min(5).email().required(),
    password: joi.string().min(5).required(),
  });

  return schema.validate(data);
};

module.exports = {
  user,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
};
