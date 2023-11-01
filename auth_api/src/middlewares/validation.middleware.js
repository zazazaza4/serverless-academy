const serverResponse = require('../utils/responses');
const { BAD_REQUEST } = require('../constants/messages');
const Validator = require('../utils/validator');

const validationUser = (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!Validator.isRequired(email) || !Validator.isRequired(password)) {
      throw new Error('Email and Password are required fields');
    }

    if (!Validator.isEmail(email)) {
      throw new Error('Invalid email format');
    }

    if (!Validator.lengthRange(password, 6, 20)) {
      throw new Error('Password must be between 6 and 20 characters');
    }

    next();
  } catch (error) {
    serverResponse.sendError(res, { ...BAD_REQUEST, error: error.message });
  }
};

module.exports = {
  validationUser,
};
