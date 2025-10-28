const express = require('express');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Apply auth middleware to all admin routes
router.use(auth);
router.use(adminAuth);

// @route   GET /api/admin/