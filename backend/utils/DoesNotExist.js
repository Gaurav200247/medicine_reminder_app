const customAPIError = require("../Errors/customError");

const DoesNotExist = (value, msg, statuscode) => {
  if (!value) {
    throw new customAPIError(msg, statuscode);
  }
};

module.exports = DoesNotExist;
