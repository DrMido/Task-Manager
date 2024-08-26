/* eslint-disable no-undef */
const mongoose = require('mongoose');

const mongodbConnnect = () => {
  mongoose.connect(process.env.MongoDB);
  console.log('Connected to MongoDB');
};

module.exports = mongodbConnnect;
