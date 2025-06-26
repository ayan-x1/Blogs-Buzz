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
    <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
          Welcome to Our Blog
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
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
          <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Featured Post</h2>
          <div className="aspect-w-16 aspect-h-9 md:aspect-h-7">
            <BlogCard post={posts[0]} />
          </div>
        </motion.div>
      )}

      {/* Posts Grid */}
      <div className="mb-16">
        <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Latest Posts</h2>
        {loading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <motion.div
                key={n}
                className="bg-gray-200 h-96 dark:bg-gray-700 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
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