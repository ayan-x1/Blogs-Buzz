import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
    >
      {/* Card Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={post.image || 'https://source.unsplash.com/random/800x600/?technology'}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center mb-4 space-x-2">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
          {post.category && (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
              {post.category}
            </span>
          )}
        </div>

        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
          <Link to={`/blog/${post.id}`}>{post.title}</Link>
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.content}
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
        <div className="flex items-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <img
            src={post.author?.avatar || 'https://ui-avatars.com/api/?name=' + post.author}
            alt={post.author}
            className="w-8 h-8 rounded-full mr-3"
          />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {post.author}
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