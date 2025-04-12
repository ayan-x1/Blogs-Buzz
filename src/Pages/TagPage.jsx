import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Blogs from "../Components/Blogs";
import Pagination from "../Components/Pagination";
import { motion } from "framer-motion";

const TagPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Properly decode the tag from URL
  const tag = decodeURIComponent(location.pathname.split("/").at(-1));

  // Format tag for display (remove hyphens and capitalize first letter of each word)
  const formatTag = (tag) => {
    return tag
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const displayTag = formatTag(tag);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <motion.button 
            className="mb-8 inline-flex items-center px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </motion.button>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Exploring
          </h1>
          <motion.div 
            className="inline-block"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <span className="inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl font-medium shadow-lg hover:shadow-xl transition-shadow duration-200">
              #{displayTag}
            </span>
          </motion.div>

          <motion.p 
            className="mt-6 text-xl text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Discover insightful articles about {displayTag.toLowerCase()}
          </motion.p>
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <Blogs />
          <Pagination />
        </div>
      </motion.div>
    </div>
  );
};

export default TagPage;
