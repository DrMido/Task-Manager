/* eslint-disable no-undef */
require('dotenv').config();
const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');

// passport
app.use(passport.initialize());

// session
app.use(
  session({
    secret: process.env.Session_Secret,
    resave: true,
    saveUninitialized: true,
  }),
);

// middleware
const errorHandlerMiddleware = require('./Middleware/error-handler.js');
app.use(errorHandlerMiddleware);

// routes
const Router = require('./Routes/Router.js');
app.use('/', Router);

// db connection
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MongoDB);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
// view engine setup
app.set('views', './public/views');
app.set('view engine', 'ejs');
// uses
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
  connectDB();
  app.listen(
    process.env.PORT,
    console.log(`Server started on port ${process.env.PORT}`),
  );
} catch (error) {
  console.log(error);
}
