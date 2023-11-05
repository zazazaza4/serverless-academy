const { APIError } = require('../constants/errors');
const {
  INTERNAL_SERVER_ERROR,
  SUCCESSFUL_CREATED,
} = require('../constants/messages');
const logger = require('../utils/logger');
const serverResponse = require('../utils/responses');
const urlService = require('../services/url.service');
const getFullUrlApp = require('../utils/url/getFullUrlApp');

class UrlController {
  async createShortUrl(req, res) {
    try {
      const { origUrl } = req.body;
      const baseUrl = getFullUrlApp(req);

      const shortUrl = await urlService.createShortUrl(origUrl, baseUrl);

      serverResponse.sendSuccess(res, shortUrl, SUCCESSFUL_CREATED);
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
