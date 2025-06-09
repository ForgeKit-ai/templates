import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { CardSkeleton } from '../components/ui/LoadingSpinner';

const fetchPosts = async () => {
  const { data } = await axios.get('/api/posts?status=published&limit=12');
  return data.data; // API returns { success: true, data: { posts: [...], pagination: {...} } }
};

const Home = () => {
  const { data: postsData, isLoading, error } = useQuery('published-posts', fetchPosts);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [regularPosts, setRegularPosts] = useState([]);

  useEffect(() => {
    if (postsData?.posts) {
      setFeaturedPost(postsData.posts[0]);
      setRegularPosts(postsData.posts.slice(1));
    }
  }, [postsData]);

  // Mock data for when there are no posts yet
  const mockPosts = [
    {
      _id: '1',
      title: 'The Future of Web Development',
      excerpt: 'Exploring the latest trends and technologies shaping the future of web development, from React to AI integration.',
      author: { firstName: 'John', lastName: 'Doe', avatar: '' },
      publishedAt: new Date().toISOString(),
      readTime: 5,
      tags: ['technology', 'web development'],
      featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
      slug: 'future-of-web-development'
    },
    {
      _id: '2',
      title: 'Minimalist Design Principles',
      excerpt: 'Understanding the core principles of minimalist design and how to apply them in modern user interfaces.',
      author: { firstName: 'Jane', lastName: 'Smith', avatar: '' },
      publishedAt: new Date().toISOString(),
      readTime: 3,
      tags: ['design', 'minimalism'],
      featuredImage: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=400&fit=crop',
      slug: 'minimalist-design-principles'
    },
    {
      _id: '3',
      title: 'Remote Work Best Practices',
      excerpt: 'Tips and strategies for maintaining productivity and work-life balance while working remotely.',
      author: { firstName: 'Mike', lastName: 'Johnson', avatar: '' },
      publishedAt: new Date().toISOString(),
      readTime: 7,
      tags: ['productivity', 'remote work'],
      featuredImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
      slug: 'remote-work-best-practices'
    }
  ];

  const posts = postsData?.posts || mockPosts;
  const featured = featuredPost || posts[0];
  const regular = regularPosts.length > 0 ? regularPosts : posts.slice(1);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Welcome to Our Blog</h2>
          <p className="text-neutral-600 mb-8">Discover stories, insights, and ideas from our community.</p>
          <div className="text-red-600">
            <p>Unable to load posts. The server might be starting up.</p>
            <p className="text-sm mt-2">Please refresh the page in a moment.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-50 via-white to-orange-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold serif text-neutral-900 mb-6">
              Stories Worth
              <span className="text-primary block">Reading</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
              Discover compelling narratives, insightful articles, and thought-provoking content 
              from writers around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn btn-primary px-8 py-3">
                Start Writing
              </Link>
              <Link to="/about" className="btn btn-secondary px-8 py-3">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold serif text-neutral-900 mb-8">Featured Story</h2>
            <Link to={`/post/${featured.slug}`} className="block group">
              <article className="card card-hero overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={featured.featuredImage || 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=800&h=400&fit=crop'}
                      alt={featured.title}
                      className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="md:w-1/2 p-8 md:p-12">
                    <div className="flex items-center space-x-2 mb-4">
                      {featured.tags?.slice(0, 2).map(tag => (
                        <span key={tag} className="text-xs font-medium text-primary bg-orange-50 px-3 py-1 rounded-full">
                          {tag.charAt(0).toUpperCase() + tag.slice(1)}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-3xl font-bold serif text-neutral-900 mb-4 group-hover:text-primary transition-colors">
                      {featured.title}
                    </h3>
                    <p className="text-neutral-600 mb-6 leading-relaxed">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center">
                          <span className="text-neutral-600 font-medium text-sm">
                            {featured.author?.firstName?.charAt(0)}{featured.author?.lastName?.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900">
                            {featured.author?.firstName} {featured.author?.lastName}
                          </p>
                          <p className="text-sm text-neutral-500">
                            {new Date(featured.publishedAt).toLocaleDateString('en-US', { 
                              month: 'long', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-neutral-500">
                        {featured.readTime} min read
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* Recent Articles */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold serif text-neutral-900">Latest Stories</h2>
            <Link to="/search" className="btn btn-ghost">
              View All
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regular.map((post) => (
                <Link key={post._id} to={`/post/${post.slug}`} className="block group">
                  <article className="card h-full overflow-hidden">
                    <img
                      src={post.featuredImage || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop'}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        {post.tags?.slice(0, 1).map(tag => (
                          <span key={tag} className="text-xs font-medium text-primary bg-orange-50 px-2 py-1 rounded-full">
                            {tag.charAt(0).toUpperCase() + tag.slice(1)}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold serif text-neutral-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-neutral-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-neutral-200 rounded-full flex items-center justify-center">
                            <span className="text-neutral-600 text-xs font-medium">
                              {post.author?.firstName?.charAt(0)}
                            </span>
                          </div>
                          <span className="text-neutral-700">
                            {post.author?.firstName} {post.author?.lastName}
                          </span>
                        </div>
                        <span className="text-neutral-500">
                          {post.readTime} min
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold serif text-neutral-900 mb-4">
              Never Miss a Story
            </h2>
            <p className="text-neutral-600 mb-8">
              Get the latest articles delivered straight to your inbox. 
              Join our community of readers and writers.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="form-input flex-1"
                required
              />
              <button type="submit" className="btn btn-primary px-6">
                Subscribe
              </button>
            </form>
            <p className="text-sm text-neutral-500 mt-4">
              No spam, unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;