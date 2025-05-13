import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { motion } from 'framer-motion';

const AddBlog = () => {
  const navigate = useNavigate();
  const { addBlog } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    category: '',
    author: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Format tags into an array
      const formattedTags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag);

      // Create a new blog with all required fields
      const newBlog = {
        ...formData,
        tags: formattedTags,
        date: new Date().toISOString(),
        id: Date.now().toString(),
        // Add this to match the format shown in your screenshots
        tagCategory: formData.category || 'Web Development', // Default to Web Development if no category
        description: formData.content.substring(0, 150) + '...', // Create a brief description from content
      };

      await addBlog(newBlog);
      
      // Navigate to the appropriate tag page based on the primary category
      // This assumes you have routes set up for different categories
      navigate(`/category/${formData.category || 'web-development'}`);
    } catch (error) {
      console.error('Error adding blog:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl p-6 mx-auto"
    >
      <h2 className="mb-8 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">
        Create New Blog
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            placeholder="Enter blog title"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="6"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            placeholder="Write your blog content"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            placeholder="technology, web development, react"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          >
            <option value="">Select a category</option>
            <option value="Web Development">Web Development</option>
            <option value="Front-end Development">Front-end Development</option>
            <option value="Back-end Development">Back-end Development</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Career">Career</option>
            <option value="Responsive Design">Responsive Design</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Author
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            placeholder="Enter author name"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 font-medium text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {loading ? 'Publishing...' : 'Publish Blog'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddBlog;