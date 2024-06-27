const express = require("express");
const authRoute = express.Router();

const { register, login } = require("../Controller/authController");

authRoute.post("/register", register);

authRoute.post("/login", login);

module.exports = authRoute;
