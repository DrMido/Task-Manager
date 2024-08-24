/* eslint-disable no-undef */
require('dotenv').config();
const express = require('express');
const app = express();
const errorHandler = require('./Middleware/error-handler');
const mongodbConnnect = require('./config/mongodbConnect');
app.use(errorHandler);

// express config
require('./config/expressConfig')(app);

// database
require('./config/mongodbConnect')();

// route
require('./config/route')(app);

// start
try {
  mongodbConnnect();
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
} catch (error) {
  console.log(error);
}
