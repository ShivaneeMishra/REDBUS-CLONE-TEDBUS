const Review = require('../models/reviewModel');

// नया रिव्यू सेव करने के लिए
exports.addReview = async (req, res) => {
    try {
        const { busId, author, rating, content } = req.body;
        const newReview = new Review({ busId, author, rating, content });
        await newReview.save();
        res.status(201).json({ message: 'Review added successfully', review: newReview });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// किसी खास बस के सभी रिव्यू लाने और एवरेज रेटिंग निकालने के लिए
exports.getReviewsByBus = async (req, res) => {
    try {
        const { busId } = req.params;
        const reviews = await Review.find({ busId, isHidden: false }).sort({ createdAt: -1 });
        
        let averageRating = 0;
        if (reviews.length > 0) {
            const sum = reviews.reduce((acc, rev) => acc + rev.rating, 0);
            averageRating = Number((sum / reviews.length).toFixed(1));
        }

        res.status(200).json({ reviews, averageRating, totalReviews: reviews.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// अपवोट बढ़ाने के लिए
exports.upvoteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndUpdate(
            id, 
            { $inc: { upvotes: 1 } }, 
            { new: true }
        );
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// रिपोर्ट करने पर रिव्यू को छुपाने (Hide) के लिए
exports.reportReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndUpdate(
            id, 
            { isHidden: true }, 
            { new: true }
        );
        res.status(200).json({ message: 'Review reported and hidden', review });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// रिव्यू अपडेट करने के लिए (24 घंटे की जांच के साथ)
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // 24 घंटे (Milliseconds) की जांच
    const hoursElapsed = (Date.now() - new Date(review.createdAt).getTime()) / (1000 * 60 * 60);
    if (hoursElapsed > 24) {
      return res.status(400).json({ message: "24-hour edit window has expired." });
    }

    review.content = content || review.content;
    await review.save();

    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};