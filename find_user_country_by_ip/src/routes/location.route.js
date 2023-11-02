const router = require('express').Router();

const getIP = require('../middleware/ip.middleware');
const loadIPData = require('../middleware/loadIPdata.middleware');
const searchByIP = require('../utils/searchByIP');
const { intToIP } = require('../utils/ipConversion');

router.get('/location', getIP, loadIPData, async (req, res) => {
  try {
    const { userIP, userIntIP, dbLocation } = req;

    const result = searchByIP(dbLocation, userIntIP);

    console.log(userIntIP);

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
});

module.exports = router;
