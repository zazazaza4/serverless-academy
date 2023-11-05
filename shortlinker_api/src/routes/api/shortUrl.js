const router = require('express').Router();

const urlController = require('../../controllers/url.controller');
const validateUrl = require('../../middleware/validation.middleware');

router.post('/shorten', validateUrl, urlController.createShortUrl);

router.get('/:shortUrl', urlController.redirectToOriginalUrl);

module.exports = router;
