import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { 
  ArrowRightIcon,
  ClockIcon,
  EyeIcon,
  UserIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';
import { CardSkeleton } from '../components/ui/LoadingSpinner';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { formatDate, formatRelativeTime } from '../lib/utils';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const fetchPosts = async () => {
  const { data } = await axios.get('/api/posts?status=published&limit=12');
  return data.data;
};

function AnimatedSection({ children, delay = 0 }) {
  const { elementRef, hasIntersected } = useIntersectionObserver();

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: 50 }}
      animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

function FeaturedPost({ post }) {
  return (
    <AnimatedSection>
      <Link to={`/post/${post.slug}`} className="block group">
        <Card variant="hero" className="overflow-hidden h-full">
          <div className="md:flex h-full">
            <div className="md:w-1/2 relative">
              <img
                src={post.featuredImage || 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=800&h=600&fit=crop'}
                alt={post.title}
                className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="primary" className="bg-white/90 text-primary-600 backdrop-blur-sm">
                  <SparklesIcon className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              </div>
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center space-x-2 mb-4">
                {post.tags?.slice(0, 2).map(tag => (
                  <Badge key={tag} variant="secondary" size="sm">
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </Badge>
                ))}
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                {post.title}
              </h2>
              
              <p className="text-neutral-600 mb-6 leading-relaxed text-lg">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar
                    src={post.author?.avatar}
                    name={`${post.author?.firstName} ${post.author?.lastName}`}
                  />
                  <div>
                    <p className="font-medium text-neutral-900">
                      {post.author?.firstName} {post.author?.lastName}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {formatDate(post.publishedAt)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-neutral-500">
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="h-4 w-4" />
                    <span>{post.readTime} min read</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <EyeIcon className="h-4 w-4" />
                    <span>{post.views || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </AnimatedSection>
  );
}

function PostCard({ post, index }) {
  return (
    <AnimatedSection delay={index * 0.1}>
      <Link to={`/post/${post.slug}`} className="block group h-full">
        <Card className="h-full overflow-hidden">
          <div className="relative">
            <img
              src={post.featuredImage || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop'}
              alt={post.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 left-3">
              {post.tags?.[0] && (
                <Badge variant="primary" size="sm" className="bg-white/90 text-primary-600 backdrop-blur-sm">
                  {post.tags[0].charAt(0).toUpperCase() + post.tags[0].slice(1)}
                </Badge>
              )}
            </div>
          </div>
          
          <CardContent className="flex flex-col h-full">
            <div className="flex-1">
              <h3 className="text-xl font-bold font-serif text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-neutral-600 mb-4 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
              <div className="flex items-center space-x-2">
                <Avatar
                  src={post.author?.avatar}
                  name={`${post.author?.firstName} ${post.author?.lastName}`}
                  size="sm"
                />
                <div>
                  <p className="text-sm font-medium text-neutral-700">
                    {post.author?.firstName} {post.author?.lastName}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {formatRelativeTime(post.publishedAt)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-xs text-neutral-500">
                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-3 w-3" />
                  <span>{post.readTime}m</span>
                </div>
                <div className="flex items-center space-x-1">
                  <EyeIcon className="h-3 w-3" />
                  <span>{post.views || 0}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </AnimatedSection>
  );
}

export default function Home() {
  const { data: postsData, isLoading, error } = useQuery({
    queryKey: ['published-posts'],
    queryFn: fetchPosts
  });

  // Mock data for demonstration
  const mockPosts = [
    {
      _id: '1',
      title: 'The Future of Web Development: Trends to Watch in 2024',
      excerpt: 'Exploring the latest trends and technologies shaping the future of web development, from React Server Components to AI integration.',
      author: { 
        firstName: 'Sarah', 
        lastName: 'Chen', 
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612-b5c4f38d?w=150&h=150&fit=crop&crop=face'
      },
      publishedAt: new Date().toISOString(),
      readTime: 8,
      views: 1247,
      tags: ['Technology', 'Web Development', 'Future'],
      featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
      slug: 'future-of-web-development-2024'
    },
    {
      _id: '2',
      title: 'Mastering Minimalist Design: Less is More',
      excerpt: 'Understanding the core principles of minimalist design and how to apply them in modern user interfaces for maximum impact.',
      author: { 
        firstName: 'Marcus', 
        lastName: 'Johnson', 
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      readTime: 6,
      views: 892,
      tags: ['Design', 'UI/UX', 'Minimalism'],
      featuredImage: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop',
      slug: 'mastering-minimalist-design'
    },
    {
      _id: '3',
      title: 'Remote Work Best Practices for 2024',
      excerpt: 'Essential tips and strategies for maintaining productivity, work-life balance, and team collaboration in remote work environments.',
      author: { 
        firstName: 'Emily', 
        lastName: 'Rodriguez', 
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      },
      publishedAt: new Date(Date.now() - 172800000).toISOString(),
      readTime: 10,
      views: 1456,
      tags: ['Productivity', 'Remote Work', 'Career'],
      featuredImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
      slug: 'remote-work-best-practices-2024'
    },
    {
      _id: '4',
      title: 'Building Sustainable Mobile Apps',
      excerpt: 'Learn how to create mobile applications that are not only user-friendly but also environmentally sustainable.',
      author: { 
        firstName: 'David', 
        lastName: 'Kim', 
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      publishedAt: new Date(Date.now() - 259200000).toISOString(),
      readTime: 7,
      views: 634,
      tags: ['Mobile', 'Sustainability', 'Development'],
      featuredImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      slug: 'building-sustainable-mobile-apps'
    },
    {
      _id: '5',
      title: 'The Art of Technical Writing',
      excerpt: 'How to write clear, concise, and engaging technical documentation that actually helps your users.',
      author: { 
        firstName: 'Lisa', 
        lastName: 'Thompson', 
        avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face'
      },
      publishedAt: new Date(Date.now() - 345600000).toISOString(),
      readTime: 9,
      views: 789,
      tags: ['Writing', 'Documentation', 'Communication'],
      featuredImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop',
      slug: 'art-of-technical-writing'
    }
  ];

  const posts = postsData?.posts || mockPosts;
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Welcome to Our Blog</h2>
          <p className="text-neutral-600 mb-8">Discover stories, insights, and ideas from our community.</p>
          <div className="text-amber-600 bg-amber-50 p-4 rounded-lg">
            <p>The blog is starting up. Please refresh in a moment to see the latest posts.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-neutral-50 via-white to-primary-50 py-20 lg:py-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid opacity-50"></div>
        
        <div className="container relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium mb-8"
            >
              <SparklesIcon className="h-4 w-4" />
              <span>Welcome to our community</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-neutral-900 mb-6 text-balance">
              Stories Worth
              <span className="text-primary-600 block">Reading</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Discover compelling narratives, insightful articles, and thought-provoking content 
              from writers around the world.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                size="lg" 
                className="group"
                onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Reading
                <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="secondary" size="lg">
                <UserIcon className="h-4 w-4 mr-2" />
                Join Our Community
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-neutral-900">50+</div>
                <div className="text-sm text-neutral-600">Articles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neutral-900">10k+</div>
                <div className="text-sm text-neutral-600">Readers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neutral-900">25+</div>
                <div className="text-sm text-neutral-600">Writers</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section id="featured" className="py-20">
          <div className="container">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold font-serif text-neutral-900 mb-4">
                  Featured Story
                </h2>
                <p className="text-neutral-600 max-w-2xl mx-auto">
                  Our editors' pick for this week's must-read article
                </p>
              </div>
            </AnimatedSection>
            
            <FeaturedPost post={featuredPost} />
          </div>
        </section>
      )}

      {/* Latest Articles */}
      <section className="py-20 bg-neutral-50">
        <div className="container">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold font-serif text-neutral-900 mb-4">
                  Latest Stories
                </h2>
                <p className="text-neutral-600">
                  Fresh perspectives and insights from our community
                </p>
              </div>
              <Button variant="ghost" size="lg">
                View All
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </AnimatedSection>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <PostCard key={post._id} post={post} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20">
        <div className="container">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-12 text-white">
              <h2 className="text-4xl font-bold font-serif mb-4">
                Never Miss a Story
              </h2>
              <p className="text-primary-100 mb-8 text-lg max-w-2xl mx-auto">
                Get the latest articles delivered straight to your inbox. 
                Join our community of readers and discover amazing content weekly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-neutral-900 placeholder-neutral-500 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-500"
                />
                <Button variant="secondary" size="lg" className="whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
              
              <p className="text-sm text-primary-100 mt-4">
                No spam, unsubscribe at any time. Read our{' '}
                <Link to="/privacy" className="underline hover:text-white">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}