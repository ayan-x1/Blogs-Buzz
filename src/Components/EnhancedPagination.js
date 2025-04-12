import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const EnhancedPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page, shouldScroll = false) => {
    if (page !== currentPage && !isLoading) {
      onPageChange(page);
      if (shouldScroll) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    disabled: { scale: 1, opacity: 0.5 },
  };

  const currentPageVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50">
      <div className="max-w-fit mx-auto px-6 py-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-lg">
        {/* Loading Spinner */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -top-8 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                className="w-6 h-6 border-3 border-indigo-600 rounded-full"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  borderTopColor: 'transparent',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination Controls */}
        <div className="flex items-center space-x-1">
          {/* Previous Button */}
          <motion.button
            onClick={() => handlePageChange(currentPage - 1, false)}
            disabled={currentPage === 1 || isLoading}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            animate={currentPage === 1 || isLoading ? 'disabled' : 'initial'}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </motion.button>

          {/* Page Numbers */}
          <div className="flex space-x-1">
            {pageNumbers.map((number) => (
              <motion.button
                key={number}
                onClick={() => handlePageChange(number, true)}
                disabled={isLoading}
                variants={currentPage === number ? currentPageVariants : buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                animate={currentPage === number ? 'pulse' : 'initial'}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  currentPage === number
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {number}
              </motion.button>
            ))}
          </div>

          {/* Next Button */}
          <motion.button
            onClick={() => handlePageChange(currentPage + 1, false)}
            disabled={currentPage === totalPages || isLoading}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            animate={currentPage === totalPages || isLoading ? 'disabled' : 'initial'}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPagination; 