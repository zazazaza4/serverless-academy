const userService = require('../services/user.service');
const serverResponse = require('../utils/responses');
const {
  INTERNAL_SERVER_ERROR,
  SUCCESSFUL,
  NOT_FOUND,
} = require('../constants/messages');
const logger = require('../utils/logger');

class UserController {
  async getMe(req, res) {
    try {
      const { id } = req.user;
      const userData = await userService.getMe(id);

      if (!userData) {
        return serverResponse.sendError(res, NOT_FOUND);
      }

      const userResponse = { id, email };

      serverResponse.sendSuccess(res, userResponse, SUCCESSFUL);
    } catch (error) {
      logger.error(error.message);
      serverResponse.sendError(res, INTERNAL_SERVER_ERROR);
    }
  }
}

module.exports = new UserController();
