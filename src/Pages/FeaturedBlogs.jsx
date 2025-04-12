import React, { useState, useEffect } from 'react';
import BlogCard from '../Components/BlogCard';
import { motion } from 'framer-motion';
import LoadingState from '../Components/LoadingState';

const FeaturedBlogs = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [featuredBlogs, setFeaturedBlogs] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFeaturedBlogs([
                {
                    id: 'software-engineering-2023',
                    title: 'Why Software Engineering Is More Than Just Coding',
                    content: 'Software engineering is often thought of as just writing code...',
                    author: 'John Smith',
                    date: 'Feb 14, 2023',
                    category: 'Software Engineering',
                    tags: ['Software Development', 'Agile', 'Project Management'],
                    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1000&q=80'
                },
                {
                    id: 'web-dev-career-2023',
                    title: 'How to Build a Successful Career in Web Development',
                    content: 'Web development is a rapidly growing field...',
                    author: 'Samantha Lee',
                    date: 'Mar 1, 2023',
                    category: 'Web Development',
                    tags: ['Web Development', 'Career', 'Skills'],
                    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80'
                },
                {
                    id: 'ai-ethics-2023',
                    title: 'The Ethics of AI: Challenges and Opportunities',
                    content: 'As AI becomes more pervasive...',
                    author: 'David Chen',
                    date: 'Feb 5, 2023',
                    category: 'AI',
                    tags: ['AI', 'Ethics', 'Responsible AI'],
                    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80'
                },
                {
                    id: 'ai-trends-2023',
                    title: '10 AI Trends to Watch in 2023',
                    content: 'As we enter a new year, it\'s important to take stock...',
                    author: 'Jane Doe',
                    date: 'Jan 2, 2023',
                    category: 'AI',
                    tags: ['AI', 'Machine Learning'],
                    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80'
                }
            ]);
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <LoadingState message="Loading featured blogs..." />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Featured Blogs
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    Discover and add interesting articles to your blog collection
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredBlogs.map((blog, index) =>
                    blog ? <BlogCard key={blog.id || index} blog={blog} /> : null
                )}
            </div>
        </div>
    );
};

export default FeaturedBlogs;
