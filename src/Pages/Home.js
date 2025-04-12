import React, { useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import BlogCard from '../Components/BlogCard';
import { motion } from 'framer-motion';
import EnhancedPagination from '../Components/EnhancedPagination';

const Home = () => {
  const { posts, loading, page, totalPages, handlePageChange } = useContext(AppContext);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to Our Blog
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover insightful articles about technology, software development, and digital innovation.
        </p>
      </motion.div>

      {/* Featured Post */}
      {posts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Featured Post</h2>
          <div className="aspect-w-16 aspect-h-9 md:aspect-h-7">
            <BlogCard post={posts[0]} />
          </div>
        </motion.div>
      )}

      {/* Posts Grid */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Latest Posts</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <motion.div
                key={n}
                className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {posts.slice(1).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </motion.div>
        )}
      </div>

      {/* Pagination */}
      <EnhancedPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoading={loading}
      />
    </div>
  );
};

export default Home; 