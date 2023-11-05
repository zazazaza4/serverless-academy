const { APIError } = require('../constants/errors');
const { INTERNAL_SERVER_ERROR } = require('../constants/messages');
const logger = require('../utils/logger');
const serverResponse = require('../utils/responses');
const urlService = require('../services/url.service');

class UrlController {
  async createShortUrl(req, res) {
    try {
      const { origUrl } = req.body;

      const shortUrl = await urlService.createShortUrl(origUrl);

      serverResponse.sendSuccess(res, shortUrl);
    } catch (error) {
      logger.log(error.message);
      if (error instanceof APIError) {
        serverResponse.sendError(res, { error: error.message });
      } else {
        serverResponse.sendError(res, INTERNAL_SERVER_ERROR);
      }
    }
  }

  async redirectToOriginalUrl(req, res) {
    try {
      const { shortUrl } = req.params;

      const origUrl = await urlService.getOriginalUrl(shortUrl);

      if (!origUrl) {
        throw new APIError('URL not found');
      }

      res.redirect(origUrl);
    } catch (error) {
      logger.log(error.message);
      if (error instanceof APIError) {
        serverResponse.sendError(res, { error: error.message });
      } else {
        serverResponse.sendError(res, INTERNAL_SERVER_ERROR);
      }
    }
  }
}

module.exports = new UrlController();
