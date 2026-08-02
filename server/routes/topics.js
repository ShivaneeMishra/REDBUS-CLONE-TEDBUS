const express = require('express');
const router = express.Router();
const topicsController = require('../controller/topics');

router.get('/', topicsController.getTopics);

module.exports = router;