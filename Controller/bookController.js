// import
const joi = require("joi");
const asyncHandler = require("express-async-handler");
let { Author } = require("../model/AuthorModel");
let {
  Book,
  validateUpdateBook,
  validateCreateBook,
} = require("../model/BookModel");

/**
 *   @desc  Get aAll books
 * @route  books/
 * @method  Get
 * @access  public
 */

const getAllBooks = asyncHandler(async (req, res) => {
  let data;
  let { minPrice, maxPrice } = req.query;

  if (minPrice && maxPrice) {
    data = await Book.find({
      price: { $gte: minPrice, $lte: maxPrice },
    }).populate("author", ["_id", "fName", "lName"]);
  } else {
    data = await Book.find().populate("author", ["_id", "fName", "lName"]);
  }

  if (data.length > 0) {
    res.status(201).send(data);
  }
});

/**
 * @desc  find book by id
 * @route  books/:id
 * @method  Get
 * @access  public
 */
const findBookByID = asyncHandler(async (req, res) => {
  let data = await Book.findById(req.params._id).populate("author", [
    "fName",
    "lName",
  ]);
  if (data) {
    return res.status(201).send(data);
  } else {
    res.status(201).send({ message: "no data for this id" });
  }
});

/**
 * @desc Create book
 * @route  books/add
 * @method  Post
 * @access  private
 */

let createBook = asyncHandler(async (req, res) => {
  const { error } = validateCreateBook(req.body);
  if (error) {
    return res.status(404).send(`error ${error.message}`);
  }

  let data = await Book.create(req.body);
  res.send(data);
});

/**
 * @desc update book
 * @route  books/update
 * @method  put
 * @access  private
 */
const updateBook = asyncHandler(async (req, res) => {
  const { error } = validateUpdateBook(req.body);
  if (error) {
    return res.status(404).send(`error => ${error.message}`);
  }

  let data = await Book.findByIdAndUpdate(req.params._id, req.body, {
    new: true,
  });
  if (data) {
    return res.status(201).send(data);
  } else {
    res.send("no data for this id");
  }
});

/**
 * @desc    delete book
 * @route   books/delete
 * @method  delete
 * @access  private
 */

const deleteBook = asyncHandler(async (req, res) => {
  let data = await Book.findByIdAndDelete(req.params._id);
  if (data) {
    return res.status(201).send("data deleted ");
  } else {
    return res.send("no data for this id");
  }
});

module.exports = {
  getAllBooks,
  findBookByID,
  createBook,
  updateBook,
  deleteBook,
}
