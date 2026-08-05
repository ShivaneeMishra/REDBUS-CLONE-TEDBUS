const mongoose = require('mongoose');


const notificationSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, required: true }
}, { timestamps: true });

const notificationPreferenceSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    emailEnabled: { type: Boolean, default: true },
    pushEnabled: { type: Boolean, default: true },
    promoEnabled: { type: Boolean, default: false },
    preferredLanguage: { type: String, default: 'en' }
}, { timestamps: true });


const Notification = mongoose.model('Notification', notificationSchema);
const NotificationPreference = mongoose.model('NotificationPreference', notificationPreferenceSchema);

module.exports = { Notification, NotificationPreference };