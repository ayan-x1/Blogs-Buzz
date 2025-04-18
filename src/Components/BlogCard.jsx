import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BlogCard = (props) => {
  // Handle both prop naming conventions (blog and post)
  const post = props.post || props.blog;
  
  // Return early if no data is provided
  if (!post) {
    return null;
  }

  // Default image if none provided
  const defaultImage = 'https://source.unsplash.com/random/800x600/?technology';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col overflow-hidden transition-shadow duration-300 bg-white shadow-lg dark:bg-gray-800 rounded-xl hover:shadow-2xl"
    >
      {/* Card Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={post.image || defaultImage}
          alt={post.title || 'Blog post'}
          className="object-cover w-full h-full"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center mb-4 space-x-2">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            {post.date ? new Date(post.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }) : 'No date'}
          </span>
          {post.category && (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
              {post.category}
            </span>
          )}
        </div>

        <h2 className="mb-2 text-xl font-bold text-gray-900 transition-colors duration-200 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
          <Link to={`/blog/${post.id}`}>{post.title || 'Untitled Post'}</Link>
        </h2>

        <p className="mb-4 text-gray-600 dark:text-gray-300 line-clamp-3">
          {post.content || 'No content available'}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {post.tags && post.tags.map((tag, index) => (
            <Link
              key={index}
              to={`/tags/${tag}`}
              className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              #{tag}
            </Link>
          ))}
        </div>

        {/* Author Info */}
        <div className="flex items-center pt-4 mt-6 border-t border-gray-200 dark:border-gray-700">
          <img
            src={post.author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author || 'Anonymous')}`}
            alt={post.author || 'Anonymous'}
            className="w-8 h-8 mr-3 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {post.author || 'Anonymous'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {post.readTime || '5 min read'}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default BlogCard;