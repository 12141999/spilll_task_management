// routes/auth.js

const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");

const router = express.Router();

// User Registration
router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required."),
    body("email").isEmail().withMessage("Valid email is required."),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long."),
  ],
  authController.register
);

// User Login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required."),
    body("password").notEmpty().withMessage("Password is required."),
  ],
  authController.login
);

module.exports = router;
