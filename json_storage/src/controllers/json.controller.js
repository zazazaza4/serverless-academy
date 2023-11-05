const jsonService = require('../services/json.service');
const {
  INTERNAL_SERVER_ERROR,
  SUCCESSFUL_CREATED,
  BAD_REQUEST,
} = require('../constants/messages');
const serverResponse = require('../utils/responses');
const logger = require('../utils/logger');
const { APIError } = require('../constants/errors');

class JsonController {
  async getJSON(req, res) {
    try {
      const jsonPath = req.params.json_path;

      const data = await jsonService.getJsonByUrl(jsonPath);

      res.json(data);
    } catch (error) {
      logger.error(error.message);

      if (error instanceof APIError) {
        serverResponse.sendError(res, {
          message: error.message,
        });
      } else {
        serverResponse.sendError(res, INTERNAL_SERVER_ERROR);
      }
    }
  }

  async saveJSON(req, res) {
    try {
      const jsonPath = req.params.json_path;
      const data = req.body;

      const result = await jsonService.saveJsonByUrl(jsonPath, data);
      serverResponse.sendSuccess(res, result, SUCCESSFUL_CREATED);
    } catch (error) {
      logger.error(error.message);

      if (error instanceof APIError) {
        serverResponse.sendError(res, {
          error: error.message,
        });
      } else {
        serverResponse.sendError(res, INTERNAL_SERVER_ERROR);
      }
    }
  }
}

module.exports = new JsonController();
