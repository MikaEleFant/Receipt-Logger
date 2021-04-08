const Validator = require("validator");

module.exports = function validateLoginInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.username)) {
    errors.username = "Please enter your username.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Please enter your password.";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};