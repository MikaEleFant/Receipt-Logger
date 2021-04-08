const Validator = require('validator');

module.exports = function validateReceiptInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.name)) {
    errors.name = "Please enter the name of the establishment for this receipt.";
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = "Please enter the address of the establishment as shown on your receipt.";
  }

  if (Validator.isEmpty(data.amount)) {
    errors.amount = "Please enter the total amount (including tax & tip) paid for this receipt.";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};