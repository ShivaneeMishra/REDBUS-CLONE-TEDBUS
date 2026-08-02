const Forum = require('../models/forumModel');

exports.getAllForums = async (req, res) => {
  try {
    const forums = await Forum.find();
    res.status(200).json(forums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getForumById = async (req, res) => {
  try {
    const forum = await Forum.findByIdAndUpdate(req.params.id,
      {$inc: {views: 1}},
      {new:true}

    );
    if (!forum) return res.status(404).json({ message: 'Forum not found' });
    res.status(200).json(forum);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createForum = async (req, res) => {
  const newForum = new Forum(req.body);
  try {
    const savedForum = await newForum.save();
    res.status(201).json(savedForum);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateForum = async (req, res) => {
  try {
    const updatedForum = await Forum.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedForum);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteForum = async (req, res) => {
  try {
    await Forum.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Forum deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.reportForum = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    
    
    const updatedForum = await Forum.findByIdAndUpdate(
      id,
      { isReported: true, reportReason: reason },
      { new: true }
    );
    
    res.status(200).json({ message: 'Forum post reported successfully', data: updatedForum });
  } catch (error) {
    res.status(500).json({ message: 'Error reporting forum post', error });
  }
  
};

exports.getTrendingForum = async (req, res) => {
  try {
    const trendingThreads = await Forum.find()
      .sort({ views: -1 , createdAt:-1}) 
      .limit(5);          
      
    res.status(200).json(trendingThreads);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trending forum', error: error.message });
  }
};
exports.updatePostStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'approved' या 'rejected'

    const updatedPost = await Forum.findByIdAndUpdate(
      id, 
      { status: status }, 
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post status updated successfully', data: updatedPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};