const bcrypt = require('bcrypt');

const userService = require('../services/user.service');
const serverResponse = require('../utils/responses');
const {
  INTERNAL_SERVER_ERROR,
  SUCCESSFUL_CREATED,
  CONFLICT,
  SUCCESSFUL,
  BAD_REQUEST,
} = require('../constants/messages');
const tokenService = require('../services/userToken.service');
const logger = require('../utils/logger');
const { APIError } = require('../constants/errors');

class AuthController {
  async signUp(req, res) {
    try {
      const { email, password } = req.body;

      const user = await userService.create(email, password);

      const { accessToken, refreshToken } = await tokenService.generateTokens(
        user
      );

      const data = {
        id: user.id,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      serverResponse.sendSuccess(res, data, SUCCESSFUL_CREATED);
    } catch (error) {
      logger.error(error.message);

      if (error instanceof APIError) {
        serverResponse.sendError(res, { error: error.message });
      } else {
        serverResponse.sendError(res, CONFLICT);
      }
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;

      const user = await userService.findByEmail(email);

      const passwordIsValid = await bcrypt.compare(password, user.password);

      if (!passwordIsValid) {
        return serverResponse.sendError(res, BAD_REQUEST);
      }

      const { accessToken, refreshToken } = await tokenService.generateTokens(
        user
      );

      const data = {
        id: user.id,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      serverResponse.sendSuccess(res, data, SUCCESSFUL);
    } catch (error) {
      logger.error(error.message);

      if (error instanceof APIError) {
        serverResponse.sendError(res, { error: error.message });
      } else {
        serverResponse.sendError(res, CONFLICT);
      }
    }
  }
}

module.exports = new AuthController();
