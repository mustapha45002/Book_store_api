// import
const asyncHandler = require("express-async-handler");
const joi = require("joi");
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

const getAllAuthors = asyncHandler(async (req, res) => {
  let { pageNumber } = req.query;
  authorForPage = 2;
  let findAuthor = await Author.find()
    .skip(authorForPage * (pageNumber - 1))
    .limit(authorForPage);
  console.log(findAuthor);
  if (findAuthor) {
    return res.status(201).json(findAuthor);
  } else {
    res.status(404).send("no data found");
  }
});

/**
 * @desc     find BY Id
 * @route    author/:id
 * @method   get
 * @access   public
 */

const findAuthorById  = asyncHandler(async (req, res) => {
  let authorById = await Author.findById(req.params._id);
  if (authorById) {
    return res.status(201).send(authorById);
  } else {
    res.status(404).send("no data for id");
  }
});

/**
 * @desc     create Author
 * @route    author/add
 * @method   post
 * @access   private
 */

const createAuthor = asyncHandler(async (req, res) => {
  let { error } = validateCreateAuthor(req.body);
  if (!error) {
    let creatUser = await Author.create(req.body);
    res.status(201).send(creatUser);
  } else {
    res.status(401).send(`author has not been added ${error.message}`);
  }
});

/**
 * @desc     update
 * @route    author/:id
 * @method   put
 * @access   private
 */

const updateAuthor = asyncHandler(async (req, res) => {
  let { error } = validateUpdateAuthor(req.body);
  if (error) {
    return res.status(404).send(`error => ${error.message}`);
  }

  let data = await Author.findByIdAndUpdate(req.params._id, req.body, {
    new: true,
  });
  if (data) {
    res.status(201).send(data);
  } else {
    res.send("no data for this id");
  }
});


/**
 * @desc     delete
 * @route    author/:id
 * @method   put
 * @access   private
 */

const deleteAuthor=
asyncHandler(async (req, res) => {
  let findAuthor = await Author.findByIdAndDelete(req.params);
  if (findAuthor) res.status(200).send("Author deleted ");
  else {
    res.send("no id for this author to delete");
  }
})

module.exports = { getAllAuthors, findAuthorById , createAuthor, updateAuthor, deleteAuthor};
