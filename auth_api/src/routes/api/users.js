const router = require('express').Router();

const auth = require('../../middlewares/auth.middleware');
const userController = require('../../controllers/user.controller');

router.get('/me', auth, userController.getMe);

module.exports = router;
