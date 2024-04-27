 const express = require("express");
const userRoute = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { user, validateUpdateUser } = require("../model//UserModel");
const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("../middleWare/verifyToken");

/**
 * @desc    show all users 
 * @route   user/
 * @method  get
 * @access  private
 */
userRoute.get(
  "/",verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    let data = await user.find()//.select("userName email ");
    res.status(202).send(data);
  })
);

/**
 * @desc    Get user by ID 
 * @route   user/find/:id
 * @method  get
 * @access  private (only admin and user him self)
 */
userRoute.post(
    "/find/:id",verifyTokenAndAuthorization,
    asyncHandler(async (req, res) => {
      let data = await user.findById(req.params.id).select("-password")
      if(!data){
        return res.status(403).send({message:"no user found"})
      }
      res.status(202).send(data);
    })
  );
  

/**
 * @desc    delete user by id
 * @route   user/:id
 * @method  delete
 * @access  private (only admin and user him self)
 */
userRoute.delete(
    "/:id",verifyTokenAndAuthorization,
    asyncHandler(async (req, res) => {
      let data = await user.findById(req.params.id)
      if(!data){
        return res.status(403).send({message:"no user found"})
      }
      await user.findByIdAndDelete(req.params.id).select("-password")
      
      res.status(202).send("user has been deleted");
    })
  );
  




module.exports = { userRoute };
