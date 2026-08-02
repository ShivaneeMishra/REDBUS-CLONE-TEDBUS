const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const communityPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  image: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [{ text: String, postedBy: String, date: { type: Date, default: Date.now } }],
  isReported: { type: Boolean, default: false },
  reportReason: { type: String, default: '' }
});
module.exports = mongoose.model('CommunityPost', communityPostSchema);
