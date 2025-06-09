import React from 'react';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const { slug } = useParams();

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold serif text-neutral-900 mb-4">
            Blog Post: {slug}
          </h1>
          <p className="text-neutral-600">
            This is the blog post page for slug: {slug}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;