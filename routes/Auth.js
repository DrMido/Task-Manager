const express = require('express');
const userModel = require('../models/User');
const validateregister = require('../Middleware/register');
const validateLogin = require('../Middleware/login');
const encrypt = require('../Middleware/encryption');
const router = express.Router();

const { assignToken } = require('../config/token');

router.post('/register', validateregister, async (req, res) => {
  const result = validateregister(req.body);
  if (!result.success) {
    return res
      .status(200)
      .json({ success: result.success, errors: result.errors });
  }
  userModel.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res
        .status(200)
        .json({ success: false, errors: ['Email already in use'] });
    }
  });

  const newUser = new userModel({
    username: req.body.username,
    email: req.body.email,
    password: encrypt(req.body.password),
  });
  let User = await newUser.save();
  return res.status(200).json({
    success: true,
    Message: 'User created successfully',
    token: assignToken(User),
    user: {
      username: User.username,
      email: User.email,
    },
  });
});

router.post('/login', validateLogin, async (req, res) => {
  const result = validateLogin(req.body);
  if (!result.success) {
    return res
      .status(200)
      .json({ success: result.success, errors: result.errors });
  }

  userModel.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res
        .status(200)
        .json({ success: false, errors: ['Email not found'] });
    }
    if (!user.authenticate(req.body.password)) {
      return res.status(200).json({
        success: false,
        errors: ['Invalid email or password'],
      });
    }
    const token = assignToken(user);
    return res.status(200).json({
      success: true,
      Message: 'User logged in successfully',
      token: token,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  });
});
