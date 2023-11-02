const router = require('express').Router();

const locationRoutes = require('./location.route');

router.use('/location', locationRoutes);

module.exports = router;
