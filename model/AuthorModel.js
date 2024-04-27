const mongoose = require("mongoose");
const joi = require("joi");


const authorSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      min: [0, "less than the required"],
      max: [25, "more than allowed"],
      required: [true, "id missing?"],
    },
    fName: {
      type: String,
      required: [true, "fName missing?"],
      minlength: 3,
      maxlength: 200,
    },
    lName: {
      type: String,
      required: [true, "lName missing?"],
      minlength: 3,
      maxlength: 200,
    },
    nationalId: {
      type: Number,
      min: [20000000000000, "no valid Id"],
      max: [39999999999999, "much not valid"],
    },
    img: { type: String, default: "default-img.png" },
  },
  { timestamps: true }
);
let Author = mongoose.model("Author", authorSchema);

let validateCreateAuthor = (author) => {
  let authorSchema = joi.object({
    id: joi.number().min(0).max(25).required(),
    fName: joi.string().min(3).max(25).required(),
    lName: joi.string().min(3).max(25).required(),
    nationalId: joi.number().min(20000000000000).max(39999999999999).required(),
    img: joi.string().min(3).max(25),
  });
  return authorSchema.validate(author);
};

let validateUpdateAuthor = (author) => {
  let authorSchema = joi.object({
    id: joi.number().min(0).max(25),
    fName: joi.string().min(3).max(25),
    lName: joi.string().min(3).max(25),
    nationalId: joi.number().min(20000000000000).max(39999999999999),
    img: joi.string().min(3).max(25),
  });
  return authorSchema.validate(author);
};

module.exports = { Author, validateCreateAuthor, validateUpdateAuthor };
