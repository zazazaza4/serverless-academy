const router = require('express').Router();

const locationController = require('../../controllers/location.controller');
const getIP = require('../../middleware/ip.middleware');
const loadIPData = require('../../middleware/loadIPdata.middleware');

router.get('/', getIP, loadIPData, async (req, res) => {
  await locationController.getLocation(req, res);
});

module.exports = router;
