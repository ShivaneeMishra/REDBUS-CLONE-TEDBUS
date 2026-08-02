const express = require('express');
const router = express.Router();
const replyController = require('../controller/replyController');
router.post('/',replyController.createReply);
router.get('/:forumId',replyController.getRepliesByForumId);

module.exports=router;