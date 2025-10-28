const express = require('express');
const { body, validationResult } = require('express-validator');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/comments/post/:postId
// @desc    Get all comments for a post
// @access  Public
router.get('/post/:postId', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const comments = await Comment.find({ 
      post: req.params.postId,
      parentComment: null
    })
      .populate('author', 'username avatar')
      .populate({
        path: 'replies',
        populate: {
          path: 'author',
          select: 'username avatar'
        }
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Comment.countDocuments({ 
      post: req.params.postId,
      parentComment: null 
    });

    res.json({
      comments,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/comments
// @desc    Create a new comment
// @access  Private
router.post('/', [
  auth,
  body('content').notEmpty().withMessage('Comment content is required'),
  body('postId').notEmpty().withMessage('Post ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content, postId, parentCommentId } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = new Comment({
      content,
      author: req.user._id,
      post: postId,
      parentComment: parentCommentId || null
    });

    await comment.save();
    await comment.populate('author', 'username avatar');

    if (parentCommentId) {
      await Comment.findByIdAndUpdate(
        parentCommentId,
        { $push: { replies: comment._id } }
      );
    }

    await Post.findByIdAndUpdate(
      postId,
      { $inc: { commentsCount: 1 } }
    );

    res.status(201).json({
      message: 'Comment created successfully',
      comment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/comments/:id
// @desc    Delete a comment
// @access  Private (Author only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await Comment.deleteMany({ parentComment: req.params.id });
    await Comment.findByIdAndDelete(req.params.id);

    await Post.findByIdAndUpdate(
      comment.post,
      { $inc: { commentsCount: -1 } }
    );

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;