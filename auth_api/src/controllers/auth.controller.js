const bcrypt = require('bcrypt');

const userService = require('../services/user.service');
const serverResponse = require('../utils/responses');
const generateTokens = require('../utils/generateTokens');
const {
  INTERNAL_SERVER_ERROR,
  SUCCESSFUL_CREATED,
  CONFLICT,
  SUCCESSFUL,
  BAD_REQUEST,
} = require('../constants/messages');

class AuthController {
  async signUp(req, res) {
    try {
      const { email, password } = req.body;

      const user = await userService.create(email, password);

      serverResponse.sendSuccess(res, user, SUCCESSFUL_CREATED);
    } catch (err) {
      console.error(err);
      serverResponse.sendError(res, CONFLICT);
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;

      const user = await userService.findByEmail(email);

      const passwordIsValid = await bcrypt.compare(password, user.password);

      if (!passwordIsValid) {
        serverResponse.sendError(res, BAD_REQUEST);
      }

      const { accessToken, refreshToken } = await generateTokens(user);

      const data = {
        id: user.id,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      serverResponse.sendSuccess(res, data, SUCCESSFUL);
    } catch (err) {
      console.error(err);
      serverResponse.sendError(res, INTERNAL_SERVER_ERROR);
    }
  }
}

module.exports = new AuthController();
