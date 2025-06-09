const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Post = require('../models/Post');
const { auth, optionalAuth, ownerOrAdmin } = require('../middleware/auth');

const router = express.Router();

// Middleware to fetch post and attach to req
const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username firstName lastName avatar');
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    req.resource = post;
    next();
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    next(error);
  }
};

// @route   GET /api/posts
// @desc    Get all published posts with pagination and filtering
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('search').optional().isLength({ max: 100 }).withMessage('Search term too long'),
  query('category').optional().isLength({ max: 50 }).withMessage('Category name too long'),
  query('tag').optional().isLength({ max: 50 }).withMessage('Tag name too long'),
  query('author').optional().isLength({ max: 50 }).withMessage('Author name too long')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    let query = { status: 'published' };

    // Search functionality
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    // Category filter
    if (req.query.category) {
      query.categories = { $in: [req.query.category] };
    }

    // Tag filter
    if (req.query.tag) {
      query.tags = { $in: [req.query.tag] };
    }

    // Author filter
    if (req.query.author) {
      query['author.username'] = new RegExp(req.query.author, 'i');
    }

    // Execute query
    const posts = await Post.find(query)
      .populate('author', 'username firstName lastName avatar')
      .select('title slug excerpt author tags categories featuredImage publishedAt readTime views likeCount commentCount')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Post.countDocuments(query);

    res.json({
      success: true,
      data: {
        posts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching posts'
    });
  }
});

// @route   GET /api/posts/:id
// @desc    Get single post by ID
// @access  Public
router.get('/:id', optionalAuth, getPost, async (req, res) => {
  try {
    const post = req.resource;

    // Only allow viewing published posts or drafts if owner/admin
    if (post.status !== 'published') {
      if (!req.user || (req.user._id.toString() !== post.author._id.toString() && req.user.role !== 'admin')) {
        return res.status(404).json({
          success: false,
          message: 'Post not found'
        });
      }
    }

    // Increment view count
    await post.incrementViews();

    // Check if current user liked this post
    let userLiked = false;
    if (req.user) {
      userLiked = post.likes.some(like => like.user.toString() === req.user._id.toString());
    }

    res.json({
      success: true,
      data: {
        ...post.toObject(),
        userLiked,
        likeCount: post.likeCount,
        commentCount: post.commentCount
      }
    });

  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching post'
    });
  }
});

// @route   POST /api/posts
// @desc    Create new post
// @access  Private
router.post('/', [
  auth,
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title is required and cannot exceed 200 characters'),
  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Content is required'),
  body('excerpt')
    .optional()
    .isLength({ max: 300 })
    .withMessage('Excerpt cannot exceed 300 characters'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('categories')
    .optional()
    .isArray()
    .withMessage('Categories must be an array'),
  body('status')
    .optional()
    .isIn(['draft', 'published'])
    .withMessage('Status must be either draft or published')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { title, content, excerpt, tags, categories, featuredImage, status, seo } = req.body;

    // Generate unique slug
    let baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    let slug = baseSlug;
    let counter = 1;

    while (await Post.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const post = new Post({
      title,
      slug,
      content,
      excerpt,
      author: req.user._id,
      tags: tags || [],
      categories: categories || [],
      featuredImage: featuredImage || '',
      status: status || 'draft',
      seo: seo || {}
    });

    await post.save();
    await post.populate('author', 'username firstName lastName avatar');

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post
    });

  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating post'
    });
  }
});

// @route   PUT /api/posts/:id
// @desc    Update post
// @access  Private (Owner or Admin)
router.put('/:id', [
  auth,
  getPost,
  ownerOrAdmin(),
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('content')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Content cannot be empty'),
  body('excerpt')
    .optional()
    .isLength({ max: 300 })
    .withMessage('Excerpt cannot exceed 300 characters'),
  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived'])
    .withMessage('Status must be draft, published, or archived')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { title, content, excerpt, tags, categories, featuredImage, status, seo } = req.body;
    const post = req.resource;

    // Update fields
    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    if (excerpt !== undefined) post.excerpt = excerpt;
    if (tags !== undefined) post.tags = tags;
    if (categories !== undefined) post.categories = categories;
    if (featuredImage !== undefined) post.featuredImage = featuredImage;
    if (status !== undefined) post.status = status;
    if (seo !== undefined) post.seo = { ...post.seo, ...seo };

    await post.save();
    await post.populate('author', 'username firstName lastName avatar');

    res.json({
      success: true,
      message: 'Post updated successfully',
      data: post
    });

  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating post'
    });
  }
});

// @route   DELETE /api/posts/:id
// @desc    Delete post
// @access  Private (Owner or Admin)
router.delete('/:id', auth, getPost, ownerOrAdmin(), async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Post deleted successfully'
    });

  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting post'
    });
  }
});

// @route   POST /api/posts/:id/like
// @desc    Toggle like on post
// @access  Private
router.post('/:id/like', auth, getPost, async (req, res) => {
  try {
    const post = req.resource;
    const userId = req.user._id;

    // Check if user already liked the post
    const likeIndex = post.likes.findIndex(like => like.user.toString() === userId.toString());

    if (likeIndex > -1) {
      // Unlike the post
      post.likes.splice(likeIndex, 1);
    } else {
      // Like the post
      post.likes.push({ user: userId });
    }

    await post.save();

    res.json({
      success: true,
      message: likeIndex > -1 ? 'Post unliked' : 'Post liked',
      data: {
        liked: likeIndex === -1,
        likeCount: post.likeCount
      }
    });

  } catch (error) {
    console.error('Toggle like error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while toggling like'
    });
  }
});

// @route   POST /api/posts/:id/comments
// @desc    Add comment to post
// @access  Private
router.post('/:id/comments', [
  auth,
  getPost,
  body('content')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Comment must be between 1 and 1000 characters')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const post = req.resource;
    const { content } = req.body;

    post.comments.push({
      user: req.user._id,
      content
    });

    await post.save();
    await post.populate('comments.user', 'username firstName lastName avatar');

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: {
        comment: post.comments[post.comments.length - 1],
        commentCount: post.commentCount
      }
    });

  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding comment'
    });
  }
});

module.exports = router;