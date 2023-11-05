const serverResponse = require('../utils/responses');
const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require('../constants/messages');
const Validator = require('../utils/validator');
const { ValidationError } = require('../constants/errors');

const validateJsonPathGet = (req, res, next) => {
  try {
    const jsonPath = req.params.json_path;

    if (!Validator.isRequired(jsonPath)) {
      throw new ValidationError('Json Path is required.');
    }

    next();
  } catch (error) {
    if (error instanceof ValidationError) {
      serverResponse.sendError(res, { ...BAD_REQUEST, error: error.message });
    } else {
      serverResponse.sendError(res, INTERNAL_SERVER_ERROR);
    }
  }
};

const validateJsonPathAndDataPost = (req, res, next) => {
  try {
    const jsonPath = req.params.json_path;
    const { data } = req.body;

    if (!Validator.isRequired(jsonPath)) {
      throw new ValidationError('Json Path is required.');
    }

    if (!Validator.isRequired(data)) {
      throw new ValidationError('Data is required.');
    }

    next();
  } catch (error) {
    if (error instanceof ValidationError) {
      serverResponse.sendError(res, { ...BAD_REQUEST, error: error.message });
    } else {
      serverResponse.sendError(res, INTERNAL_SERVER_ERROR);
    }
  }
};

module.exports = {
  validateJsonPathGet,
  validateJsonPathAndDataPost,
};
