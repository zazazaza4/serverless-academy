const validUrl = require('valid-url');

const { ValidationError } = require('../constants/errors');
const { INTERNAL_SERVER_ERROR } = require('../constants/messages');
const serverResponse = require('../utils/responses');

function validateUrl(req, res, next) {
  try {
    const { origUrl } = req.body;

    if (!origUrl || !validUrl.isWebUri(origUrl)) {
      throw new ValidationError('Invalid URL');
    }

    next();
  } catch (error) {
    if (error instanceof ValidationError) {
      serverResponse.sendError(res, { error: error.message });
    } else {
      serverResponse.sendError(res, INTERNAL_SERVER_ERROR);
    }
  }
}

module.exports = validateUrl;
