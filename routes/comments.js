const express = require('express');
const router = express.Router();
const Comment = require('../controller/comment');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', Comment.GetallComment);

router.post('/', auth, Comment.CreateComment);

router.put('/:id', Comment.UpdateComment);

router.get('/:id', Comment.GetoneComment);

router.delete('/:id', [auth, /*admin*/], Comment.DeleteComment);


module.exports = router;