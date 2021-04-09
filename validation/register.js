const Validator = require("validator");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  if (!Validator.isLength(data.username, {min: 6, max: 30})) {
    errors.username = "Username must be between 6 and 30 characters.";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "A username is required.";
  }

  if (!Validator.isLength(data.password, {min: 8})) {
    errors.password = "Password must contain at least 8 characters.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "A password is required.";
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Please confirm your password.";
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Passwords must match.";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};