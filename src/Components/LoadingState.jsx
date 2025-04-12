import React from 'react';
import { motion } from 'framer-motion';
import Spinner from './Spinner';

const LoadingState = ({ message = "Loading..." }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-[200px] p-8"
    >
      <Spinner size="lg" />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-6 text-xl font-medium bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
      >
        {message}
      </motion.p>
      <motion.div
        className="mt-6 flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LoadingState; 