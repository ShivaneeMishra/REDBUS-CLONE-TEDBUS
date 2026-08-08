const express = require('express');
const router = express.Router();
const { saveRoute } = require('../controller/routeplannerController');

router.post('/save', saveRoute);

module.exports = router;