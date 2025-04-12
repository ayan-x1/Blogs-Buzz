import React from 'react'
import Header from '../Components/Header'
import Blogs from '../Components/Blogs'
import Pagination from '../Components/Pagination'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    return (
        <div className="relative">
            <Header />
            <Blogs />
            <Pagination />

            {/* Floating Add Blog Button */}
            <motion.button
                onClick={() => navigate('/add-blog')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed z-50 px-4 py-2 text-white bg-blue-600 rounded-full shadow-lg bottom-6 right-6"
            >
                + Add Blog
            </motion.button>
        </div>
    )
}

export default Home;