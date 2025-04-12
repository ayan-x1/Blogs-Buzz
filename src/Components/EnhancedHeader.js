import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../Context/ThemeContext';
import { Link, NavLink } from 'react-router-dom';

const EnhancedHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const headerVariants = {
    visible: { 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    },
    hidden: { 
      y: "-100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    }
  };

  return (
    <motion.header
      variants={headerVariants}
      animate={isVisible ? "visible" : "hidden"}
      initial="visible"
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BLOGS
              </h1>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) =>
                `text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                  isActive ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/featured-blogs" 
              className={({ isActive }) =>
                `text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                  isActive ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
                }`
              }
            >
              Featured Blogs
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) =>
                `text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                  isActive ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
                }`
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) =>
                `text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                  isActive ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
                }`
              }
            >
              Contact
            </NavLink>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="relative w-12 h-12 rounded-full flex items-center justify-center overflow-hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-purple-600 p-0.5">
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center"
                    >
                      <svg
                        className="w-6 h-6 text-yellow-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z" />
                        <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0-2 2a2 2 0 0 0-2-2a2 2 0 0 0 2-2z" />
                        <path d="M19 11h2m-1-1v2M7 4a2 2 0 0 0 2 2a2 2 0 0 0-2 2a2 2 0 0 0-2-2a2 2 0 0 0 2-2z" />
                      </svg>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ opacity: 0, rotate: 180, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: -180, scale: 0.5 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center"
                    >
                      <svg
                        className="w-6 h-6 text-orange-400"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z" />
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={isMobileMenuOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                className="w-6 h-6 text-gray-700 dark:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800"
          >
            <div className="px-4 py-6 space-y-4">
              <NavLink
                to="/"
                className="block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <motion.div
                  className="text-gray-700 dark:text-gray-200 font-medium text-lg"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Home
                </motion.div>
              </NavLink>
              <NavLink
                to="/featured-blogs"
                className="block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <motion.div
                  className="text-gray-700 dark:text-gray-200 font-medium text-lg"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Featured Blogs
                </motion.div>
              </NavLink>
              <NavLink
                to="/about"
                className="block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <motion.div
                  className="text-gray-700 dark:text-gray-200 font-medium text-lg"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  About
                </motion.div>
              </NavLink>
              <NavLink
                to="/contact"
                className="block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <motion.div
                  className="text-gray-700 dark:text-gray-200 font-medium text-lg"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Contact
                </motion.div>
              </NavLink>
              
              {/* Mobile Theme Toggle */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <motion.button
                  onClick={toggleTheme}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-purple-600 p-0.5">
                    <div className={`w-full h-full rounded-full flex items-center justify-center ${
                      theme === 'dark' ? 'bg-gray-900' : 'bg-blue-100'
                    }`}>
                      {theme === 'dark' ? (
                        <svg
                          className="w-4 h-4 text-yellow-300"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z" />
                          <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0-2 2a2 2 0 0 0-2-2a2 2 0 0 0 2-2z" />
                          <path d="M19 11h2m-1-1v2M7 4a2 2 0 0 0 2 2a2 2 0 0 0-2 2a2 2 0 0 0-2-2a2 2 0 0 0 2-2z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 text-orange-400"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">
                    {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default EnhancedHeader; 