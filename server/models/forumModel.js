const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
  author: { type: String, required: true },
  
  title: { type: String, required: true },
  tags: [
    {
      name: { type: String, required: true },
      colorClass: { type: String, required: true }
    }
  ],
  replies: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  lastActiveTime: { type: String, required: true },
  lastActiveUser: { type: String, required: true },
  isReported: { type: Boolean, default: false },
  reportReason: { type: String, default: '' },
  status:{type:String,
    enum:['pending','approved','rejected'],
    default:'approved'
  },
  isApproved:{type:Boolean,default:false}
}, { timestamps: true });

module.exports = mongoose.model('Forum', forumSchema);