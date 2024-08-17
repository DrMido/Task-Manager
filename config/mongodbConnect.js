/* eslint-disable no-undef */
const mongoose = require('mongoose');

const mongodbConnnect = () => {
  mongoose.connect(process.env.MongoDB);
};

module.exports = mongodbConnnect;
