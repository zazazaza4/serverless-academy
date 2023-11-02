const userService = require('../services/user.service');
const serverResponse = require('../utils/responses');
const { INTERNAL_SERVER_ERROR, SUCCESSFUL } = require('../constants/messages');
const logger = require('../utils/logger');

class UserController {
  async getMe(req, res) {
    try {
      const { id } = req.user;

      const { email } = await userService.getMe(id);

      serverResponse.sendSuccess(res, { id, email }, SUCCESSFUL);
    } catch (error) {
      logger.error(error.message);
      serverResponse.sendError(res, INTERNAL_SERVER_ERROR);
    }
  }
}

module.exports = new UserController();
