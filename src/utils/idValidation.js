const { validate: uuidValidate } = require("uuid");

const idValidation = (userId) => {
  return uuidValidate(userId);
};

module.exports = idValidation;
