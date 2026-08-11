const express = require('express');
const router = express.Router();
const reviewController = require('../controller/reviewController');


router.post('/', reviewController.addReview);
router.get('/:busId', reviewController.getReviewsByBus);
router.put('/:id/upvote', reviewController.upvoteReview);
router.put('/:id/report', reviewController.reportReview);
router.put('/:id', reviewController.updateReview);

module.exports = router;