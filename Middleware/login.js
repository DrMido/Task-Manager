const validtor = require('validator');
const isEmail = validtor.isEmail;

const validateLogin = (body) => {
  let success = true;
  let errors = {};

  if (!body || Object.keys(body) == 0) {
    success = false;
    errors.push('Invalid arguments');
  } else {
    if (typeof body.email !== 'string' || !isEmail(body.email)) {
      success = false;
      errors.push('Invalid email');
    }

    if (typeof body.password !== 'string' || body.password.trim().length < 8) {
      success = false;
      errors.push('Invalid password; it must be more than 8 characters');
    }
  }

  return { success, errors };
};

module.exports = validateLogin;
