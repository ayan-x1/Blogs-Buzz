import React from 'react';
import { motion } from 'framer-motion';

const Spinner = ({ size = "md" }) => {
  // Size variants
  const sizes = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizes[size]} rounded-full border-4 border-t-blue-500 border-r-purple-500 border-b-blue-500 border-l-purple-500`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default Spinner;