import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { AppContext } from '../Context/AppContext';

const BlogPage = () => {
  const { blogId } = useParams();
  const { posts } = useContext(AppContext);
  const post = posts.find(p => p.id === blogId);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Post not found
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            The blog post you're looking for doesn't exist.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Hero Image */}
      <div className="relative h-96 rounded-xl overflow-hidden mb-8">
        <img
          src={post.image || 'https://source.unsplash.com/random/1200x600/?technology'}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Meta Information */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-sm font-medium">
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
          {post.category && (
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 text-sm font-medium">
              {post.category}
            </span>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>

        {/* Author Info */}
        <div className="flex items-center">
          <img
            src={post.author?.avatar || 'https://ui-avatars.com/api/?name=' + post.author}
            alt={post.author}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {post.author}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {post.readTime || '5 min read'}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* Tags */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {post.tags && post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 text-sm font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

export default BlogPage; 