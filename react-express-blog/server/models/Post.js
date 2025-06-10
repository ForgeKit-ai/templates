const mongoose = require('mongoose');
const slugify = require('slugify');
const sanitizeHtml = require('sanitize-html');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [100, 'Content must be at least 100 characters']
  },
  excerpt: {
    type: String,
    maxlength: [300, 'Excerpt cannot exceed 300 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
    maxlength: [30, 'Tag cannot exceed 30 characters']
  }],
  category: {
    type: String,
    trim: true,
    maxlength: [50, 'Category cannot exceed 50 characters'],
    default: 'General'
  },
  featuredImage: {
    type: String,
    default: null
  },
  images: [{
    url: String,
    alt: String,
    caption: String
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  publishedAt: {
    type: Date
  },
  readTime: {
    type: Number, // in minutes
    default: 1
  },
  views: {
    type: Number,
    default: 0
  },
  viewHistory: [{
    date: {
      type: Date,
      default: Date.now
    },
    count: {
      type: Number,
      default: 1
    }
  }],
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  seo: {
    metaTitle: {
      type: String,
      maxlength: [70, 'Meta title cannot exceed 70 characters']
    },
    metaDescription: {
      type: String,
      maxlength: [160, 'Meta description cannot exceed 160 characters']
    },
    keywords: [{
      type: String,
      trim: true
    }],
    canonicalUrl: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  allowComments: {
    type: Boolean,
    default: true
  },
  language: {
    type: String,
    default: 'en',
    maxlength: [5, 'Language code cannot exceed 5 characters']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance and search
postSchema.index({ slug: 1 }, { unique: true });
postSchema.index({ author: 1 });
postSchema.index({ status: 1, publishedAt: -1 });
postSchema.index({ status: 1, featured: -1, publishedAt: -1 });
postSchema.index({ tags: 1 });
postSchema.index({ category: 1 });
postSchema.index({ createdAt: -1 });
postSchema.index({ views: -1 });
postSchema.index({ 'likes.createdAt': -1 });

// Text search index
postSchema.index({ 
  title: 'text', 
  content: 'text', 
  excerpt: 'text',
  tags: 'text'
}, {
  weights: {
    title: 10,
    excerpt: 5,
    tags: 3,
    content: 1
  }
});

// Virtual for like count
postSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for URL
postSchema.virtual('url').get(function() {
  return `/post/${this.slug}`;
});

// Virtual for reading progress
postSchema.virtual('readingProgress').get(function() {
  const avgWordsPerMinute = 200;
  const wordCount = this.content ? this.content.split(/\s+/).length : 0;
  return {
    wordCount,
    readTime: Math.ceil(wordCount / avgWordsPerMinute),
    estimatedReadTime: this.readTime
  };
});

// Pre-save middleware
postSchema.pre('save', async function(next) {
  try {
    // Generate unique slug from title
    if (this.isModified('title')) {
      let baseSlug = slugify(this.title, { 
        lower: true, 
        strict: true,
        remove: /[*+~.()'"!:@]/g
      });
      
      let slug = baseSlug;
      let counter = 1;
      
      // Ensure slug is unique
      while (await this.constructor.findOne({ slug, _id: { $ne: this._id } })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
      
      this.slug = slug;
    }
    
    // Sanitize HTML content
    if (this.isModified('content')) {
      this.content = sanitizeHtml(this.content, {
        allowedTags: [
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'p', 'br', 'strong', 'em', 'u', 's',
          'blockquote', 'code', 'pre',
          'ul', 'ol', 'li',
          'a', 'img',
          'table', 'thead', 'tbody', 'tr', 'th', 'td'
        ],
        allowedAttributes: {
          'a': ['href', 'title', 'target'],
          'img': ['src', 'alt', 'title', 'width', 'height'],
          'blockquote': ['cite'],
          'code': ['class'],
          'pre': ['class']
        },
        allowedSchemes: ['http', 'https', 'mailto']
      });
    }
    
    // Auto-generate excerpt from content if not provided
    if (this.isModified('content') && !this.excerpt) {
      const plainText = this.content
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();
      
      this.excerpt = plainText.length > 250 
        ? plainText.substring(0, 250).trim() + '...' 
        : plainText;
    }
    
    // Calculate read time (average 200 words per minute)
    if (this.isModified('content')) {
      const plainText = this.content.replace(/<[^>]*>/g, '');
      const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
      this.readTime = Math.max(1, Math.ceil(wordCount / 200));
    }
    
    // Set publishedAt when status changes to published
    if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
      this.publishedAt = new Date();
    }
    
    // Generate SEO fields if not provided
    if (this.isModified('title') && !this.seo.metaTitle) {
      this.seo.metaTitle = this.title.length > 60 
        ? this.title.substring(0, 57) + '...' 
        : this.title;
    }
    
    if (this.isModified('excerpt') && !this.seo.metaDescription) {
      this.seo.metaDescription = this.excerpt;
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

// Static methods
postSchema.statics.getPublished = function(limit = 10, skip = 0) {
  return this.find({ status: 'published' })
    .populate('author', 'firstName lastName avatar bio')
    .sort({ publishedAt: -1 })
    .limit(limit)
    .skip(skip);
};

postSchema.statics.getFeatured = function(limit = 5) {
  return this.find({ status: 'published', featured: true })
    .populate('author', 'firstName lastName avatar')
    .sort({ publishedAt: -1 })
    .limit(limit);
};

postSchema.statics.getByCategory = function(category, limit = 10, skip = 0) {
  return this.find({ 
    status: 'published', 
    category: new RegExp(category, 'i') 
  })
    .populate('author', 'firstName lastName avatar')
    .sort({ publishedAt: -1 })
    .limit(limit)
    .skip(skip);
};

postSchema.statics.getByTag = function(tag, limit = 10, skip = 0) {
  return this.find({ 
    status: 'published', 
    tags: { $in: [new RegExp(tag, 'i')] }
  })
    .populate('author', 'firstName lastName avatar')
    .sort({ publishedAt: -1 })
    .limit(limit)
    .skip(skip);
};

postSchema.statics.search = function(query, limit = 10, skip = 0) {
  return this.find({
    $and: [
      { status: 'published' },
      { $text: { $search: query } }
    ]
  }, {
    score: { $meta: 'textScore' }
  })
    .populate('author', 'firstName lastName avatar')
    .sort({ score: { $meta: 'textScore' }, publishedAt: -1 })
    .limit(limit)
    .skip(skip);
};

// Instance methods
postSchema.methods.incrementViews = async function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Update daily view count
  const todayView = this.viewHistory.find(v => 
    v.date.toDateString() === today.toDateString()
  );
  
  if (todayView) {
    todayView.count += 1;
  } else {
    this.viewHistory.push({ date: today, count: 1 });
  }
  
  // Keep only last 30 days of view history
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  this.viewHistory = this.viewHistory.filter(v => v.date >= thirtyDaysAgo);
  
  this.views += 1;
  return this.save({ validateBeforeSave: false });
};

postSchema.methods.toggleLike = async function(userId) {
  const existingLike = this.likes.find(like => 
    like.user.toString() === userId.toString()
  );
  
  if (existingLike) {
    this.likes = this.likes.filter(like => 
      like.user.toString() !== userId.toString()
    );
  } else {
    this.likes.push({ user: userId });
  }
  
  return this.save({ validateBeforeSave: false });
};

postSchema.methods.getRelatedPosts = function(limit = 5) {
  return this.constructor.find({
    _id: { $ne: this._id },
    status: 'published',
    $or: [
      { category: this.category },
      { tags: { $in: this.tags } }
    ]
  })
    .populate('author', 'firstName lastName avatar')
    .sort({ publishedAt: -1 })
    .limit(limit);
};

module.exports = mongoose.model('Post', postSchema);