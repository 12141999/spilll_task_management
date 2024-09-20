// controllers/authController.js

const { validationResult } = require('express-validator');
const User = require('../models/userSchema');
const authService = require('../services/authService');

// User Registration
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with that email or username.' });
    }

    const token = await authService.registerUser(username, email, password);
    res.status(201).json({ message: 'success', token });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error: error.message });
  }
};

// User Login
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const token = await authService.loginUser(email, password);
    res.json({ message: 'success', token });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
