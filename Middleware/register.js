const validator = require('validator');
const isEmail = validator.isEmail;

const validateRegister = (body) => {
  let success = true;
  let errors = [];

  if (!body || Object.keys(body) == 0) {
    success = false;
    errors.push('Invalid arguments');
  } else {
    if (typeof body.username !== 'string' || body.username.trim().length < 4) {
      success = false;
      errors.push('Invalid username; it must be more than 4 characters');
    }

    if (typeof body.email !== 'string' || !isEmail(body.email)) {
      success = false;
      errors.push('Invalid email');
    }

    if (typeof body.password !== 'string' || body.password.trim().length < 8) {
      success = false;
      errors.push('Invalid password; it must be more than 8 characters');
    } else {
      if (
        body.confirmPassword !== 'string' ||
        body.confirmPassword.trim() !== body.password.trim()
      ) {
        success = false;
        errors.push('Passwords do not match');
      }
    }
  }

  return { success, errors };
};

module.exports = validateRegister;
