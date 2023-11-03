const router = require('express').Router();

const jsonRoutes = require('./json');

router.use('/location', jsonRoutes);

module.exports = router;
