const { Notification, NotificationPreference } = require('../models/notificationModel');


exports.getNotificationHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPreferences = async (req, res) => {
  try {
    const { userId } = req.params;
    let prefs = await NotificationPreference.findOne({ userId });
    if (!prefs) {
      prefs = await NotificationPreference.create({ userId }); 
    }
    res.status(200).json({ success: true, data: prefs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const { userId } = req.params.userId ||req.body.userId;
    const updaeData = {...req.body };
    delete updaeData._id;
    const updatedPrefs = await NotificationPreference.findOneAndUpdate(
      { userId },
      {$set: updaeData },
      { new: true, upsert: true }
    );
    res.status(200).json({ success: true, data: updatedPrefs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message }); 
  }
};