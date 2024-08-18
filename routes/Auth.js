const express = require('express');
const User = require('../models/User');
const validateregister = require('../Middleware/register');
const validateLogin = require('../Middleware/login');
const encrypt = require('../Middleware/encryption');
const router = express.Router();

const {assignToken, verifyToken} = require('../config/token');