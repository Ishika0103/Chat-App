const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization && //checks if authorization is there in headers
    req.headers.authorization.startsWith("Bearer") //Bearer is the type of token
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; //removes bearer from token and gives only token

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET); //process.env.JWT_SECRET is the secret key

      req.user = await User.findById(decoded.id).select("-password"); //select("-password") means we dont want to send password in response

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
