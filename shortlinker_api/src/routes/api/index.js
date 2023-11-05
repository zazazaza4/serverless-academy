const router = require('express').Router();
const urlRoutes = require('./shortUrl');

router.use('', urlRoutes);

module.exports = router;
