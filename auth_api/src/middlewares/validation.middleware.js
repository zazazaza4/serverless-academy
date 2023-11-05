const serverResponse = require('../utils/responses');
const { INTERNAL_SERVER_ERROR } = require('../constants/messages');
const Validator = require('../utils/validator');
const { ValidationError } = require('../constants/errors');

const validationUser = (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!Validator.isRequired(email) || !Validator.isRequired(password)) {
      throw new ValidationError('Email and Password are required fields');
    }

    if (!Validator.isEmail(email)) {
      throw new ValidationError('Invalid email format');
    }

    if (!Validator.lengthRange(password, 6, 20)) {
      throw new ValidationError('Password must be between 6 and 20 characters');
    }

    next();
  } catch (error) {
    if (error instanceof ValidationError) {
      serverResponse.sendError(res, { error: error.message });
    } else {
      serverResponse.sendError(res, INTERNAL_SERVER_ERROR);
    }
  }
};

module.exports = {
  validationUser,
};
