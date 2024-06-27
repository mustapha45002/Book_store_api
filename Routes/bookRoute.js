// import
const express = require("express");
const bookRoute = express.Router();

const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleWare/verifyToken");

const {
  getAllBooks,
  findBookByID,
  createBook,
  updateBook,
  deleteBook,
} = require("../Controller/bookController.js");


bookRoute.get("/", getAllBooks);

bookRoute.get("/:_id", findBookByID);

bookRoute.post("/add", verifyTokenAndAdmin, createBook);

bookRoute.put("/:_id", verifyTokenAndAuthorization, updateBook);

bookRoute.delete("/:_id", verifyTokenAndAdmin, deleteBook);

module.exports = bookRoute;
