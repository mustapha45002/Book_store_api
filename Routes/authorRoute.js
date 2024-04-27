// import
const express = require("express");
const authorRoute = express.Router();
const joi = require("joi");
const asyncHandler = require("express-async-handler");

const {
  Author,
  validateCreateAuthor,
  validateUpdateAuthor,
} = require("../model/AuthorModel");

/**
 * @desc    get all authors
 * @Route   author
 * @method  get
 * @access  public
 */
authorRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    let findAuthor = await Author.find(); //.select(
    //" -createdAt -updatedAt -img -nationalId");
    if (findAuthor) {
      return res.status(201).json(findAuthor);
    } else {
      res.status(404).send("no data found");
    }
  })
);

/**
 * @desc     find BY Id
 * @route    author/:id
 * @method   get
 * @access   public
 */
authorRoute.get(
  "/:_id",
  asyncHandler(async (req, res) => {
    let findAuthorById = await Author.findById(req.params._id);
    if (findAuthorById) {
      return res.status(201).send(findAuthorById);
    } else {
      res.status(404).send("no data for id");
    }
  })
);

/**
 * @desc     create Author
 * @route    author/add
 * @method   post
 * @access   public
 */
authorRoute.post(
  "/add",
  asyncHandler(async (req, res) => {
    let { error } = validateCreateAuthor(req.body);
    if (!error) {
      let creatUser = await Author.create(req.body);
      res.status(201).send(creatUser);
    } else {
      res.status(401).send(`author has not been added ${error.message}`);
    }
  })
);

/**
 * @desc     update
 * @route    author/:id
 * @method   put
 * @access   public
 */
authorRoute.put(
  "/:_id",
  asyncHandler(async (req, res) => {
    let { error } = validateUpdateAuthor(req.body);
    if (error) {
      return  res.status(404).send(`error => ${error.message}`);
    }

    let data = await Author.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    });
    if (data) {
      res.status(201).send(data);
    } else {
      res.send("no data for this id");
    }
  })
);

/**
 * @desc     delete
 * @route    author/:id
 * @method   put
 * @access   public
 */
authorRoute.delete(
  "/:_id",
  asyncHandler(async (req, res) => {
    let findAuthor = await Author.findByIdAndDelete(req.params);
    if (findAuthor) res.status(200).send("Author deleted ");
    else {
      res.send("no id for this author to delete");
    }
  })
);

module.exports = { authorRoute };
