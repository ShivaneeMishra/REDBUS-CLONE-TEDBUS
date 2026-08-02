const express = require('express');
const router = express.Router();
const forumController = require('../controller/forumController');

router.get('/', forumController.getAllForums);
router.get('/trending',forumController.getTrendingForum)

router.post('/', forumController.createForum);
router.put('/report/:id', forumController.reportForum); 
router.get('/:id', forumController.getForumById);
router.put('/status/:id',forumController.updatePostStatus);
router.put('/:id', forumController.updateForum);
router.delete('/:id', forumController.deleteForum);




module.exports = router;