import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const BlogCard = ({ blog }) => {
    const { addBlog } = useContext(AppContext);
    const navigate = useNavigate();

    if (!blog) {
        return null; // or return a placeholder/loading state
    }

    const handleAddToBlog = async () => {
        try {
            await addBlog(blog);
            navigate('/');
        } catch (error) {
            console.error('Error adding blog:', error);
        }
    };

    // Default image if none provided
    const defaultImage = 'https://via.placeholder.com/800x400/e2e8f0/475569?text=Blog+Image';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
        >
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={blog.image || defaultImage}
                    alt={blog.title || 'Blog post'}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                        e.target.src = defaultImage;
                    }}
                />
            </div>
            <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                        {blog.category || 'Uncategorized'}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {blog.date || new Date().toLocaleDateString()}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {blog.title || 'Untitled Blog Post'}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {blog.content || 'No content available'}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {(blog.tags || []).map((tag, index) => (
                        <span
                            key={index}
                            className="text-sm text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            {(blog.author || 'Anonymous').charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {blog.author || 'Anonymous'}
                        </span>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddToBlog}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
                    >
                        Add to Blog
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

BlogCard.propTypes = {
    blog: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        content: PropTypes.string,
        author: PropTypes.string,
        date: PropTypes.string,
        category: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
        image: PropTypes.string
    }).isRequired
};

export default BlogCard; 