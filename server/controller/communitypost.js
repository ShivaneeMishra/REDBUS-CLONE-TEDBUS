const CommunityPost = require('../models/communitypost');

exports.createPost = async (req, res) => {
  try {
    const newPost = new CommunityPost({
      title:req.body.title,
      content:req.body.content,
      image:req.file.filename,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.likePost = async (req, res) => {
    try {
        const post = await CommunityPost.findById(req.params.id);
        post.likes += 1;
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.addComment = async (req, res) => {
    try {
        const post = await CommunityPost.findById(req.params.id);
        post.comments.push({ text: req.body.text, postedBy: req.body.postedBy });
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.reportPost = async (req, res) => {
  try {
    const post = await CommunityPost.findByIdAndUpdate(
      req.params.id,
      {
        isReported: true,
        reportReason: req.body.reason
      },
      { new: true }
    );
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.updatePostStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'approved' या 'rejected'

    const updatedPost = await CommunityPost.findByIdAndUpdate(
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
exports.deletePost = async (req, res) => {
  try {
    await CommunityPost.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};