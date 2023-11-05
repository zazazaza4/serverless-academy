const router = require('express').Router();

const jsonRoutes = require('./json');

router.use('', jsonRoutes);

module.exports = router;
