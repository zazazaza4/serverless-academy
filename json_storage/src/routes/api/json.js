const router = require('express').Router();

const jsonController = require('../../controllers/json.controller');

router.get('/:json_path', jsonController.getJSON);

router.put('/:json_path', jsonController.saveJSON);

module.exports = router;
