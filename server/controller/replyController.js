const Reply = require('../models/replyModel');
const Forum = require('../models/forumModel')
const mongoose = require('mongoose')
exports.createReply = async (req, res) => {
  try {
    const { content, author, forumId } = req.body;
    const newReply = new Reply({ content, author, forumId });
    await newReply.save();
    await Forum.findByIdAndUpdate(forumId,{$inc:{replies:1}});
    await Forum.findByIdAndUpdate(forumId,{$inc:{views:1}});
    res.status(201).json(newReply);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRepliesByForumId = async (req, res) => {
  try {
    const { forumId } = req.params;
    const replies = await Reply.find({ forumId:new mongoose.Types.ObjectId(forumId) });
    res.status(200).json(replies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
