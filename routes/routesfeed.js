const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controllerFeed.js');

router.get('/', Controller.getFeed);
router.post('/', Controller.getFeedId);


module.exports = router;