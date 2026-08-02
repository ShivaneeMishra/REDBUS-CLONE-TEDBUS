const express = require('express');
const router = express.Router();
const notificationController = require('../controller/notificationController');

// रूट्स डिफाइन करें
router.get('/history/:userId', notificationController.getNotificationHistory);
router.patch('/read/:id', notificationController.markAsRead);
router.get('/preferences/:userId', notificationController.getPreferences);
router.put('/preferences/:userId', notificationController.updatePreferences);

module.exports = router;