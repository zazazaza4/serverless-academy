const router = require('express').Router();

const getIP = require('../middleware/ip.middleware');
const loadIPData = require('../middleware/loadIPdata.middleware');
const binarySearch = require('../utils/binarySearch');

router.get('/location', getIP, loadIPData, async (req, res) => {
  try {
    const result = binarySearch(results, req.userIP);

    if (!result) {
      return res.json({ error: 'Not Found' });
    }

    const data = {
      userIP: req.ip,
      country: result.country,
      range: {
        to: result.to,
        from: result.from,
      },
    };

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
