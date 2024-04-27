// import
const express = require("express");
const joi = require("joi");
const asyncHandler = require("express-async-handler");
const bookRoute = express.Router();
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

 

bookRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    let data = await Book.find().populate("author");    
    if (data.length > 0) {
      res.status(201).send(data);
    }
  })
);

/**
 *   @desc  find book by id
 * @route  books/:id
 * @method  Get
 * @access  public
 */
bookRoute.get(
  "/:_id",
  asyncHandler(async (req, res) => {
    let data = await Book.findById(req.params._id).populate("author", [
      "fName",
      "lName",
    ]);
    if (data) {
return res.status(201).send(data)
    } else {
      res.status(201).send({message:"no data for this id"});
    }
  })
);

/**
 * @desc Create book
 * @route  books/add
 * @method  Post
 * @access  public
 */
bookRoute.post(
  "/add",
  asyncHandler(async (req, res) => {
    const { error } = validateCreateBook(req.body);
    if (error) {
      return res.status(404).send(`error ${error.message}`)

    }

    let data = await Book.create(req.body);
    res.send(data);
  })
);

/**
 * @desc update book
 * @route  books/update
 * @method  put
 * @access  public
 */
bookRoute.put(
  "/:_id",
  asyncHandler(async (req, res) => {
    const { error } = validateUpdateBook(req.body);
    if (error) {
      return res.status(404).send(`error => ${error.message}`);
    }

    let data = await Book.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    });
    if (data) {
      return  res.status(201).send(data);
    } else {
      res.send("no data for this id");
    }
  })
);

/**
 * @desc    delete book
 * @route   books/delete
 * @method  delete
 * @access  public
 */
bookRoute.delete(
  "/:_id",
  asyncHandler(async (req, res) => {
    let data = await Book.findByIdAndDelete(req.params._id);
    if (data) {
      return  res.status(201).send("data deleted ");
    } else {
      return  res.send("no data for this id");
    }
  })
);

module.exports = { bookRoute };
