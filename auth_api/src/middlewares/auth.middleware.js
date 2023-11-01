const serverResponse = require('../utils/responses');
const userTokenService = require('../services/userToken.service');
const {
  UNAUTHORIZED,
  AUTHENTICATION_FAILED,
} = require('../constants/messages');

const auth = (req, res, next) => {
  try {
    const [bearer, token] = req?.headers?.authorization?.split(' ');

    if (bearer !== 'Bearer') {
      serverResponse.sendError(res, UNAUTHORIZED);
      return;
    }

    const user = userTokenService.verifyToken(token);

    req.user = user;
    next();
  } catch (error) {
    serverResponse.sendError(res, AUTHENTICATION_FAILED);
  }
};

module.exports = auth;
