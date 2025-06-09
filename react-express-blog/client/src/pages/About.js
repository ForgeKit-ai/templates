import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold serif text-neutral-900 mb-6">
              About Our Blog
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              A platform where stories come to life, ideas flourish, and voices are heard. 
              Welcome to our community of writers and readers.
            </p>
          </section>

          {/* Mission Section */}
          <section className="mb-16">
            <div className="card p-8 md:p-12">
              <h2 className="text-3xl font-bold serif text-neutral-900 mb-6">Our Mission</h2>
              <div className="prose prose-lg max-w-none text-neutral-700">
                <p>
                  We believe in the power of storytelling to connect, inspire, and transform. 
                  Our platform provides a space for writers of all backgrounds to share their unique perspectives 
                  and for readers to discover content that matters.
                </p>
                <p>
                  Whether you're here to explore technology trends, lifestyle tips, travel adventures, 
                  or personal reflections, you'll find a diverse collection of thoughtfully crafted articles 
                  from our community of passionate writers.
                </p>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold serif text-neutral-900 mb-8 text-center">
              What Makes Us Different
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Quality Content</h3>
                <p className="text-neutral-600">
                  Every article is carefully curated and edited to ensure the highest quality reading experience.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Community Driven</h3>
                <p className="text-neutral-600">
                  Built by writers, for writers. Our community shapes the platform and drives innovation.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Modern Experience</h3>
                <p className="text-neutral-600">
                  Clean design, fast performance, and intuitive navigation for the best reading experience.
                </p>
              </div>
            </div>
          </section>

          {/* Statistics */}
          <section className="mb-16">
            <div className="card bg-gradient-to-br from-orange-50 to-neutral-50 p-8 md:p-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold serif text-primary mb-2">1000+</div>
                  <div className="text-neutral-600">Articles Published</div>
                </div>
                <div>
                  <div className="text-3xl font-bold serif text-primary mb-2">500+</div>
                  <div className="text-neutral-600">Active Writers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold serif text-primary mb-2">50K+</div>
                  <div className="text-neutral-600">Monthly Readers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold serif text-primary mb-2">25+</div>
                  <div className="text-neutral-600">Categories</div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <h2 className="text-3xl font-bold serif text-neutral-900 mb-4">
              Ready to Join Our Community?
            </h2>
            <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
              Whether you want to share your stories or discover amazing content, 
              we'd love to have you as part of our growing community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn btn-primary px-8 py-3">
                Start Writing Today
              </Link>
              <Link to="/" className="btn btn-secondary px-8 py-3">
                Explore Articles
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;