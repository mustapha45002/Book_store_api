// import
const express = require("express");
const authorRoute = express.Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleWare/verifyToken");

const {
  getAllAuthors,
  findAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../Controller/authorController");

authorRoute.get("/", getAllAuthors);

authorRoute.get("/:_id", findAuthorById);

authorRoute.post("/add", verifyTokenAndAdmin, createAuthor);

authorRoute.put("/:_id", verifyTokenAndAdmin, updateAuthor);

authorRoute.delete("/:_id", verifyTokenAndAdmin, deleteAuthor);

module.exports = authorRoute;
