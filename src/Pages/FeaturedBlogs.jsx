import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../Context/ThemeContext';

const BlogCard = ({ post, index }) => {
  const { theme } = useTheme();
  // Animation variants for staggered card entry
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  return (
    <motion.article
      custom={index}
      initial="hidden"
      animate="visible"
      variants={variants}
      whileHover={{ 
        y: -10, 
        boxShadow: theme === 'dark' 
          ? "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)" 
          : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05)"
      }}
      className={`flex flex-col overflow-hidden transition-all duration-300 transform border rounded-2xl ${
        theme === 'dark' 
          ? 'border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900' 
          : 'border-gray-200 bg-gradient-to-br from-white to-gray-50'
      }`}
    >
      <Link to={`/blog/${post.id}`} className="group">
        <div className="relative h-56 overflow-hidden">
          <motion.img 
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
            src={post.image || 'https://source.unsplash.com/random/800x600/?technology'} 
            alt={post.title}
            className="object-cover w-full h-full transition-all duration-300 brightness-90 group-hover:brightness-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${
            theme === 'dark' 
              ? 'from-black/80 via-black/30 to-transparent opacity-80' 
              : 'from-black/60 via-black/20 to-transparent opacity-60'
          }`} />
          
          {/* Category Badge - floating with glow effect */}
          {post.category && (
            <div className="absolute right-4 top-4 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-lg shadow-blue-500/30 backdrop-blur-sm">
              {post.category}
            </div>
          )}
        </div>
        
        <div className="flex flex-col flex-grow p-6">
          {/* Date pill */}
          <div className="flex mb-4">
            <span className={`px-3 py-1 text-xs font-bold tracking-wide border rounded-full backdrop-blur-sm ${
              theme === 'dark'
                ? 'text-indigo-200 bg-indigo-900/60 border-indigo-700/50'
                : 'text-indigo-700 bg-indigo-100/80 border-indigo-200'
            }`}>
              {post.date}
            </span>
          </div>

          {/* Title with hover animation */}
          <h2 className={`mb-3 text-xl font-bold transition-colors duration-300 line-clamp-2 ${
            theme === 'dark'
              ? 'text-white group-hover:text-blue-400'
              : 'text-gray-800 group-hover:text-blue-600'
          }`}>
            {post.title}
          </h2>
          
          <p className={`mb-5 transition-colors line-clamp-3 ${
            theme === 'dark'
              ? 'text-gray-300 group-hover:text-gray-200'
              : 'text-gray-600 group-hover:text-gray-700'
          }`}>
            {post.content}
          </p>
          
          {/* Tags as pills with hover effects */}
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags && post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-700/60 text-gray-300 hover:bg-blue-900/60 hover:text-blue-200'
                    : 'bg-gray-200/80 text-gray-700 hover:bg-blue-100 hover:text-blue-800'
                }`}
              >
                #{tag}
              </span>
            ))}
            {post.tags && post.tags.length > 3 && (
              <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                theme === 'dark'
                  ? 'bg-gray-700/60 text-gray-300'
                  : 'bg-gray-200/80 text-gray-700'
              }`}>
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
          
          {/* Author info with animated highlight */}
          <div className={`flex items-center pt-4 mt-auto transition-colors border-t ${
            theme === 'dark'
              ? 'border-gray-700/50 group-hover:border-blue-700/50'
              : 'border-gray-200/80 group-hover:border-blue-300/80'
          }`}>
            <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
              {post.author.charAt(0)}
            </div>
            <div className="ml-3">
              <p className={`font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>{post.author}</p>
              <p className={`text-xs ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>{post.readTime || '5 min read'}</p>
            </div>
            <div className="ml-auto">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className={`flex items-center gap-1 text-sm font-medium ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`}
              >
                <span>Read</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

const FeaturedBlogs = () => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      setFeaturedPosts([
        {
          id: 'software-engineering-2023',
          title: 'Why Software Engineering Is More Than Just Coding',
          content: 'Software engineering is often thought of as just writing code, but it\'s so much more than that. It encompasses a wide range of skills and disciplines that go beyond just programming.',
          author: 'John Smith',
          date: 'Feb 14, 2023',
          category: 'Software Engineering',
          tags: ['Software Development', 'Agile', 'Project Management'],
          image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1000&q=80',
          readTime: '5 min read'
        },
        {
          id: 'web-dev-career-2023',
          title: 'How to Build a Successful Career in Web Development',
          content: 'Web development is a rapidly growing field with many opportunities for those willing to put in the work. Building a successful career in web development requires a combination of technical skills, soft skills, and strategic career planning.',
          author: 'Samantha Lee',
          date: 'Mar 1, 2023',
          category: 'Web Development',
          tags: ['Web Development', 'Career', 'Skills'],
          image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80',
          readTime: '7 min read'
        },
        {
          id: 'ai-ethics-2023',
          title: 'The Ethics of AI: Challenges and Opportunities',
          content: 'As AI becomes more pervasive in our daily lives, ethical considerations surrounding its development and use are becoming increasingly important. The rapid advancement of AI technologies presents both challenges and opportunities that need to be carefully addressed.',
          author: 'David Chen',
          date: 'Feb 5, 2023',
          category: 'AI',
          tags: ['AI', 'Ethics', 'Responsible AI'],
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80',
          readTime: '6 min read'
        },
        {
          id: 'ai-trends-2023',
          title: '10 AI Trends to Watch in 2023',
          content: 'As we enter a new year, it\'s important to take stock of where AI is heading. Here are 10 trends to watch in 2023, including the rise of responsible AI, the use of AI in personalized medicine, and the impact of quantum computing on AI algorithms.',
          author: 'Jane Doe',
          date: 'Jan 2, 2023',
          category: 'AI',
          tags: ['AI', 'Machine Learning', 'Deep Learning', 'Neural Networks', 'Natural Language Processing'],
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80',
          readTime: '5 min read'
        },
        {
          id: 'future-web-dev-2023',
          title: 'The Future of Web Development: Trends and Predictions',
          content: 'The web development landscape is constantly evolving. From serverless architectures to WebAssembly, new technologies are reshaping how we build web applications. This article explores emerging trends and makes predictions about the future of web development.',
          author: 'Alex Rivers',
          date: 'Mar 15, 2023',
          category: 'Web Development',
          tags: ['Web Development', 'Future Tech', 'Trends'],
          image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=1000&q=80',
          readTime: '8 min read'
        },
        {
          id: 'data-science-careers-2023',
          title: 'Breaking Into Data Science: A Complete Roadmap',
          content: 'Data Science continues to be one of the most in-demand career fields. This comprehensive guide outlines the skills, education, and experience needed to build a successful career in data science, with insights from industry experts.',
          author: 'Maria Wong',
          date: 'Feb 28, 2023',
          category: 'Data Science',
          tags: ['Data Science', 'Career', 'Machine Learning'],
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
          readTime: '10 min read'
        }
      ]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter posts by category
  const filteredPosts = selectedCategory === 'All' 
    ? featuredPosts 
    : featuredPosts.filter(post => post.category === selectedCategory);

  // Animation variants for page elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  // Categories for filter
  const categories = ['All', 'Software Engineering', 'Web Development', 'AI', 'Data Science'];

  return (
    <div className={`min-h-screen ${
      theme === 'dark' 
        ? 'text-white bg-gradient-to-b from-gray-900 via-gray-900 to-black' 
        : 'text-gray-800 bg-gradient-to-b from-gray-50 via-white to-gray-100'
    }`}>
      <div className="container px-4 py-12 mx-auto">
        {/* Hero Section with animated gradient background */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`relative mb-16 overflow-hidden rounded-3xl ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900'
              : 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600'
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent animate-pulse"></div>
          <div className="relative z-10 px-6 py-16 text-center md:px-12 md:py-24">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-4 text-4xl font-bold text-transparent md:text-6xl bg-clip-text bg-gradient-to-r from-blue-300 via-purple-200 to-pink-300"
            >
              Featured Blogs
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-2xl mx-auto mb-8 text-xl text-blue-50"
            >
              Discover cutting-edge insights and thought leadership in technology, software, AI, and digital innovation
            </motion.p>
            
            {/* Animated search bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="relative max-w-lg mx-auto"
            >
              <input
                type="text"
                placeholder="Search articles..."
                className={`w-full px-6 py-4 border rounded-full backdrop-blur-sm placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent ${
                  theme === 'dark'
                    ? 'bg-white/10 border-white/20'
                    : 'bg-white/20 border-white/30'
                }`}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 p-2.5 rounded-full hover:bg-blue-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </motion.div>
          </div>
          
          {/* Abstract shapes */}
          <div className="absolute w-32 h-32 rounded-full top-10 right-10 bg-blue-500/20 blur-3xl"></div>
          <div className="absolute w-40 h-40 rounded-full bottom-10 left-10 bg-purple-500/20 blur-3xl"></div>
        </motion.div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-24 h-24 mb-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
            <p className={`text-xl animate-pulse ${
              theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
            }`}>Discovering amazing content...</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Category Pills */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white border-blue-500' 
                      : theme === 'dark'
                        ? 'bg-gray-800/70 text-gray-300 border-gray-700 hover:bg-gray-700'
                        : 'bg-white/80 text-gray-700 border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>

            {/* Hero Featured Post */}
            {selectedCategory === 'All' && (
              <motion.div 
                variants={itemVariants}
                className="mb-16"
              >
                <h2 className={`flex items-center gap-3 mb-6 text-3xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                  <span className="w-12 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600"></span>
                  Editor's Pick
                </h2>
                
                <motion.div
                  whileHover={{ y: -5 }}
                  className={`relative overflow-hidden border rounded-2xl ${
                    theme === 'dark'
                      ? 'border-gray-800 bg-gradient-to-br from-blue-900/40 to-purple-900/40'
                      : 'border-gray-200 bg-gradient-to-br from-blue-100/40 to-purple-100/40'
                  }`}
                >
                  <Link to={`/blog/${featuredPosts[0].id}`} className="group">
                    <div className="grid gap-6 md:grid-cols-5">
                      <div className="relative overflow-hidden md:col-span-3 h-96">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                          src={featuredPosts[0].image}
                          alt={featuredPosts[0].title}
                          className="object-cover w-full h-full transition-all duration-500 brightness-90 group-hover:brightness-100"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-r ${
                          theme === 'dark'
                            ? 'from-black/60 via-black/50 to-transparent'
                            : 'from-black/40 via-black/30 to-transparent'
                        }`} />
                      </div>
                      
                      <div className="flex flex-col justify-center p-8 md:col-span-2">
                        <div className="flex items-center mb-4">
                          <span className="px-3 py-1 mr-2 text-sm font-bold text-white bg-blue-600 rounded-lg">
                            {featuredPosts[0].date}
                          </span>
                          <span className="px-3 py-1 text-sm font-bold text-white bg-purple-600 rounded-lg">
                            {featuredPosts[0].category}
                          </span>
                        </div>
                        
                        <h3 className={`mb-4 text-3xl font-bold transition-colors duration-300 ${
                          theme === 'dark'
                            ? 'text-white group-hover:text-blue-300'
                            : 'text-gray-800 group-hover:text-blue-600'
                        }`}>
                          {featuredPosts[0].title}
                        </h3>
                        
                        <p className={`mb-6 transition-colors duration-300 line-clamp-3 ${
                          theme === 'dark'
                            ? 'text-gray-300 group-hover:text-white'
                            : 'text-gray-600 group-hover:text-gray-800'
                        }`}>
                          {featuredPosts[0].content}
                        </p>
                        
                        <div className={`flex items-center pt-4 mt-auto border-t ${
                          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                        }`}>
                          <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                            {featuredPosts[0].author.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className={`font-medium ${
                              theme === 'dark' ? 'text-white' : 'text-gray-800'
                            }`}>{featuredPosts[0].author}</p>
                            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                              {featuredPosts[0].readTime}
                            </p>
                          </div>
                          <div className="ml-auto">
                            <motion.div 
                              whileHover={{ x: 5 }}
                              className={`flex items-center gap-2 font-medium ${
                                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                              }`}
                            >
                              <span>Read Article</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            )}

            {/* Latest Blogs Grid with Animation */}
            <motion.div variants={itemVariants} className="mb-16">
              <h2 className={`flex items-center gap-3 mb-6 text-3xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                <span className="w-12 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600"></span>
                {selectedCategory === 'All' ? 'Latest Articles' : selectedCategory}
              </h2>
              
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.slice(selectedCategory === 'All' ? 1 : 0).map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </div>
            </motion.div>

            {/* Subscribe Section */}
            <motion.div
              variants={itemVariants}
              className={`relative p-8 overflow-hidden border md:p-12 rounded-2xl ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-900 to-indigo-900 border-blue-800/50'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-500/50'
              }`}
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
              
              <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
                <div className="text-center md:text-left">
                  <h3 className="mb-2 text-2xl font-bold md:text-3xl text-white">Stay Updated</h3>
                  <p className="max-w-md text-blue-100">Get the latest articles and insights delivered directly to your inbox</p>
                </div>
                
                <div className="w-full md:w-auto">
                  <form className="flex w-full max-w-md">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className={`flex-grow px-4 py-3 border rounded-l-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        theme === 'dark'
                          ? 'border-blue-700 bg-white/10'
                          : 'border-blue-500 bg-white/20'
                      }`}
                      required
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="px-6 py-3 font-medium text-white transition-colors bg-blue-500 rounded-r-lg hover:bg-blue-600"
                    >
                      Subscribe
                    </motion.button>
                  </form>
                </div>
              </div>
              
              {/* Abstract shapes */}
              <div className="absolute w-20 h-20 rounded-full top-10 left-10 bg-blue-400/30 blur-2xl"></div>
              <div className="absolute w-32 h-32 rounded-full bottom-10 right-10 bg-indigo-400/20 blur-3xl"></div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FeaturedBlogs;