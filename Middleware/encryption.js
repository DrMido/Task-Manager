const bycrypt = require('bcrypt');

const encrypt = async (password) => {
  const salt = await bycrypt.genSalt(10);
  const hash = await bycrypt.hash(password, salt);
  return hash;
};

module.exports = encrypt;
