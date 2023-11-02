const { intToIP } = require('../utils/ip/ipConversion');
const findInRange = require('../utils/findInRange');
const serverResponse = require('../utils/responses');
const { INTERNAL_SERVER_ERROR } = require('../constants/messages');
const logger = require('../utils/logger');

class LocationController {
  async getLocation(req, res) {
    try {
      const { userIP, userIntIP, dbLocations } = req;

      const result = findInRange(dbLocations, userIntIP);

      if (!result) {
        throw new Error('Location not found within the provided range');
      }

      const data = {
        userIP: userIP,
        country: result.country,
        range: {
          to: intToIP(result.to),
          from: intToIP(result.from),
        },
      };

      serverResponse.sendSuccess(res, data);
    } catch (error) {
      logger.error(error);
      serverResponse.sendError(res, INTERNAL_SERVER_ERROR);
    }
  }
}

module.exports = new LocationController();
