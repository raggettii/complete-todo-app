require("dotenv").config();
const express = require("express");
const userRoute = express.Router();
const { signInSchema, signUpSchema } = require("../zod");
const { User } = require("../db/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const alert = require("alert");
// const JWT_SECRET = require("../JWT_SECRET");
// const localStorage = require("localStorage");

// salt rounds some bcrypt thing
const SALT_ROUNDS = 10;
// Just realise need to use the hashing thing
// outside the routes as the hashed pass is required in both routes
const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return hashedPassword;
};
// function to check if hashed password is entered password is same or not
const verifyPassword = async (enteredPass, hashedPass) => {
  const isMatch = await bcrypt.compare(enteredPass, hashedPass);
  return isMatch;
};

userRoute.post("/signup", async (req, res) => {
  const signUpBody = req.body;
  const { success } = signUpSchema.safeParse(signUpBody);
  try {
    if (!success) {
      res.status(411).json({
        msg: "Invailid Inputs",
      });
    }
    const existingUser = await User.findOne({
      email: req.body.email,
    });
    if (existingUser) {
      res.status(411).json({
        msg: "User already exist",
      });
    } else {
      // Need to hash the in order to store karne k lia
      const hashedPassword = await hashPassword(req.body.password);
      const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        // Hash karke password ko store karna hai
        password: hashedPassword,
      });
      res.json({
        msg: "User created successfully",
      });
    }
  } catch (error) {
    console.error("Error while SignUp", error);
  }
});

userRoute.post("/signin", async (req, res) => {
  const signInBody = req.body;
  const { success, error } = signInSchema.safeParse(signInBody);

  if (!success) {
    return res.status(400).json({
      msg: "Invalid Inputs",
      errors: error.errors,
    });
  }

  try {
    const enteredUser = await User.findOne({ username: req.body.username });

    if (!enteredUser) {
      return res.status(404).json({ msg: "User not found. Please sign up." });
    }

    const ifMatched = await verifyPassword(
      req.body.password,
      enteredUser.password
    );

    if (!ifMatched) {
      return res.status(400).json({ msg: "Incorrect Password" });
    }

    const expiresIn = "1h";
    const token = jwt.sign(
      { username: req.body.username },
      process.env.JWT_SECRET,
      { expiresIn }
    );

    // Send the token back to the client
    res.status(200).json({
      msg: "Login Successful",
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = userRoute;
