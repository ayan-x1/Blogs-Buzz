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
        </div> 
    )
}

export default Home