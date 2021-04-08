const Validator = require('validator');

module.exports = function validateCardInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.number)) {
    errors.number = "Please enter the last 4 digits of your card number.";
  }

  if (Validator.isEmpty(data.expires)) {
    errors.expires = "Please enter the expiration date of your card.";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};