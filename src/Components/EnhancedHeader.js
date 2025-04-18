import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../Context/ThemeContext';
import { Newspaper, Sun, MoonStar, Menu, X } from 'lucide-react';

const EnhancedHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { theme, toggleTheme } = useTheme();

  // Animation variants for the logo icon
  const iconVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  const headerVariants = {
    visible: { 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    hidden: { 
      y: '-100%',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      variants={headerVariants}
      animate={isVisible ? "visible" : "hidden"}
      initial="visible"
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg dark:shadow-gray-800/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              className="flex items-center group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                variants={iconVariants}
                initial="initial"
                animate="animate"
                className="relative"
              >
                <Newspaper className="w-8 h-8 mr-2 text-blue-600 dark:text-blue-400" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </motion.div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300">
                BLOGS-BUZZ
              </h1>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) =>
                `relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                  isActive ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
                } after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400 after:left-0 after:bottom-[-4px] after:rounded-full after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/featured-blogs" 
              className={({ isActive }) =>
                `relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                  isActive ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
                } after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400 after:left-0 after:bottom-[-4px] after:rounded-full after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300`
              }
            >
              Featured Blogs
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) =>
                `relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                  isActive ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
                } after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400 after:left-0 after:bottom-[-4px] after:rounded-full after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300`
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) =>
                `relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                  isActive ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
                } after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400 after:left-0 after:bottom-[-4px] after:rounded-full after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300`
              }
            >
              Contact
            </NavLink>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="relative w-14 h-7 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
              aria-label="Toggle theme"
            >
              <motion.div
                className="absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden"
                animate={{
                  x: theme === 'dark' ? '28px' : '0px',
                  rotate: theme === 'dark' ? 360 : 0,
                  backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="moon"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MoonStar className="w-3 h-3 text-yellow-300" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-3 h-3 text-orange-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="relative w-14 h-7 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1"
              aria-label="Toggle theme"
            >
              <motion.div
                className="absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden"
                animate={{
                  x: theme === 'dark' ? '28px' : '0px',
                  rotate: theme === 'dark' ? 360 : 0,
                  backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="moon"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MoonStar className="w-3 h-3 text-yellow-300" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-3 h-3 text-orange-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800"
          >
            <nav className="px-4 py-6 space-y-4">
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
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default EnhancedHeader; 