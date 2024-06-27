const express = require("express");
const userRoute = express.Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleWare/verifyToken");

const {
  showAllUsers,
  getUserById,
  deleteUserById,
} = require("../Controller/userController");


userRoute.get("/", verifyTokenAndAdmin, showAllUsers);

userRoute.post("/find/:id", verifyTokenAndAuthorization, getUserById);

userRoute.delete("/:id", verifyTokenAndAuthorization, deleteUserById);

module.exports = userRoute;
