const express = require('express');
const router = express.Router();
const { saveRoute } = require('../controller/routeplannerController');

// रूट सेव करने के लिए POST एंडपॉइंट
router.post('/save', saveRoute);

module.exports = router;