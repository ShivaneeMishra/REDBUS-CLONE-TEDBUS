const express = require('express'); 
const router = express.Router();
const communityPostController = require('../controller/communitypost');
const multer=require('multer');
const upload=multer({dest:'uploads'});


router.post('/',upload.single('image'), communityPostController.createPost);
router.get('/', communityPostController.getPosts);
router.post('/:id/like',communityPostController.likePost);
router.post('/:id/comment',communityPostController.addComment);
router.post('/:id/report',communityPostController.reportPost);
router.put('/status/:id',communityPostController.updatePostStatus);
router.delete('/:id',communityPostController.deletePost);
module.exports = router;