const mongoose = require("mongoose");
const joi = require("joi");

let bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "pls enter title"],
    minlength: 5,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: [true, "pls enter Author"],
  },
  description: {
    type: String,
    required: [true, "pls enter description"],
    minlength: 5,
  },
  price: {
    type: Number,
    required: [true, "pls enter price"],
    min: 0,
    max: 1000,
  },
  cover: {
    type: String,
    required: [true, "pls enter cover"],
    minlength: 5,
    maxlength: 25,
  },
});

function validateCreateBook(book) {
  const bookschema = joi.object({
    title: joi.string().min(3).required(),
    author: joi.string().min(3).required(),
    descrip: joi.string().min(5).required(),
    price: joi.number().integer().min(0).max(1000).required(),
    cover: joi.string().min(5).max(30).required(),
  });
  return bookschema.validate(book);
}

function validateUpdateBook(book) {
  const bookschema = joi.object({
    title: joi.string().min(3),
    author: joi.string().min(3),
    descrip: joi.string().min(3),
    price: joi.number().integer().min(0).max(1000),
    cover: joi.string().min(3).max(30),
  })
  return bookschema.validate(book);
}

let Book = mongoose.model("book", bookSchema);

module.exports = { Book, validateUpdateBook, validateCreateBook };
