/* eslint-disable no-undef */
require('dotenv').config();
const express = require('express');
const app = express();

// middleware
const errorHandlerMiddleware = require('./Middleware/error-handler.js');
app.use(errorHandlerMiddleware);

// routes
const Router = require('./Routes/Router.js');

app.use('/', Router);

// view engine setup
app.set('views', './public/views');
app.set('view engine', 'ejs');
// uses
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(
  process.env.PORT,
  console.log(`Server started on port ${process.env.PORT}`),
);
