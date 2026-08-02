const mongoose = require('mongoose');

// 1. नोटिफिकेशन स्कीमा
const notificationSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, required: true }
}, { timestamps: true });

// 2. प्रेफरेंस स्कीमा (अगर इसी फाइल में है)
const notificationPreferenceSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    emailEnabled: { type: Boolean, default: true },
    pushEnabled: { type: Boolean, default: true },
    promoEnabled: { type: Boolean, default: false },
    preferredLanguage: { type: String, default: 'en' }
}, { timestamps: true });

// 3. दोनों को एक साथ ऐसे एक्सपोर्ट करें
const Notification = mongoose.model('Notification', notificationSchema);
const NotificationPreference = mongoose.model('NotificationPreference', notificationPreferenceSchema);

module.exports = { Notification, NotificationPreference };