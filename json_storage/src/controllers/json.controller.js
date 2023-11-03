const jsonService = require('../services/json.service');
const { INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('../constants/messages');
const serverResponse = require('../utils/responses');
const logger = require('../utils/logger');

class JsonController {
  async getJSON(req, res) {
    try {
      const jsonPath = req.params.json_path;

      if (!jsonPath) {
        return serverResponse.sendError(res, BAD_REQUEST);
      }

      const result = await jsonService.getJson(jsonPath);
      serverResponse.sendSuccess(res, result);
    } catch (error) {
      logger.error(error.message);
      serverResponse.sendError(res, INTERNAL_SERVER_ERROR);
    }
  }

  async postJSON(req, res) {
    try {
      const jsonPath = req.params.json_path;
      const data = req.body;

      if (!jsonPath || !data) {
        return serverResponse.sendError(res, BAD_REQUEST);
      }

      await jsonService.saveJson(jsonPath, data);
      serverResponse.sendSuccess(res, result, SUCCESSFUL_CREATED);
    } catch (error) {
      logger.error(error.message);
      serverResponse.sendError(res, INTERNAL_SERVER_ERROR);
    }
  }
}

module.exports = new JsonController();
