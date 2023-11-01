const router = require('express').Router();

const authRoutes = require('./auth');
const userRoutes = require('./users');

router.use('/auth', authRoutes);

router.use('', userRoutes);

module.exports = router;
