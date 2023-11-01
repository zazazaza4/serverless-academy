const router = require('express').Router();

const authController = require('../../controllers/auth.controller');
const validation = require('../../middlewares/validation.middleware');

router.post('/sign-in', validation.validationUser, authController.signIn);
router.post('/sign-up', validation.validationUser, authController.signUp);

module.exports = router;
