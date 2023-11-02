const { intToIP } = require('../utils/ip/ipConversion');
const findInRange = require('../utils/ip/findInRange');

class LocationController {
  async getLocation(req, res) {
    try {
      const { userIP, userIntIP, dbLocations } = req;

      const result = findInRange(dbLocations, userIntIP);

      if (!result) {
        return res.json({ error: 'Not Found' });
      }

      const data = {
        userIP: userIP,
        country: result.country,
        range: {
          to: intToIP(result.to),
          from: intToIP(result.from),
        },
      };

      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server Error' });
    }
  }
}

module.exports = new LocationController();
