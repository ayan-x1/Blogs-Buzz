import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Animated Button Component
export const AnimatedButton = ({ children, onClick, disabled, className = '' }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.button>
  );
};

// Animated Card Component
export const AnimatedCard = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${className}`}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// Loading Skeleton Component
export const LoadingSkeleton = ({ className = '' }) => {
  return (
    <motion.div
      className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  );
};

// Toast Notification Component
export const ToastNotification = ({ message, type = 'info', onClose }) => {
  const variants = {
    hidden: { opacity: 0, y: 50, scale: 0.3 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } }
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg ${getTypeStyles()}`}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex items-center space-x-2">
          <span>{message}</span>
          <button
            onClick={onClose}
            className="ml-2 text-white hover:text-gray-200"
          >
            ×
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Animated Tag/Category Pill Component
export const AnimatedPill = ({ children, onClick, className = '' }) => {
  return (
    <motion.span
      onClick={onClick}
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.span>
  );
};

// Page Transition Component
export const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}; 