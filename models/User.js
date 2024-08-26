const mongoose = require('mongoose');
const encrypt = require('../Middleware/encryption');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.method = {
  authenticate: async function (password) {
    return (await encrypt(password)) === this.password;
  },
};

module.exports = mongoose.model('User', userSchema);
