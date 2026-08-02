const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    busId: { type: String, required: true },
    author: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    content: { type: String, required: true, minlength: 15 },
    upvotes: { type: Number, default: 0 },
    isHidden: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);