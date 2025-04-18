import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl px-4 mx-auto mt-16 sm:px-6 lg:px-8"
    >
      <motion.h1 
        className="mb-8 text-4xl font-bold text-center text-transparent text-gray-800 dark:text-white bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        About Our Blog
      </motion.h1>
      
      <motion.div 
        className="p-8 overflow-hidden border shadow-xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="prose prose-lg max-w-none">
          <p className="leading-relaxed text-gray-700 dark:text-gray-200">
            Welcome to our blog! We're passionate about sharing insightful articles about technology, 
            software development, and the latest industry trends.
          </p>
          
          <h2 className="mt-8 mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
            <span className="inline-block pb-2 border-b-2 border-blue-500">Our Mission</span>
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-200">
            Our mission is to provide high-quality, informative content that helps developers and tech 
            enthusiasts stay up-to-date with the rapidly evolving world of technology.
          </p>
          
          <h2 className="mt-8 mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
            <span className="inline-block pb-2 border-b-2 border-blue-500">Our Team</span>
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-200">
            Our team consists of experienced developers, tech writers, and industry experts who are 
            committed to sharing their knowledge and insights with our community.
          </p>
          
          <h2 className="mt-8 mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
            <span className="inline-block pb-2 border-b-2 border-blue-500">Join Our Community</span>
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-200">
            We invite you to join our growing community of tech enthusiasts. Follow us on social media, 
            subscribe to our newsletter, and engage with our content to stay connected.
          </p>
          
         
        </div>
      </motion.div>
      
      {/* Team section with cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-16"
      >
        <h2 className="mb-10 text-3xl font-bold text-center text-gray-800 dark:text-white">
          Meet Our Editorial Team
        </h2>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              name: "Ayan Pathan",
              role: "Lead Editor",
              bio: "Specialized in web development and cloud technologies."
            },
            {
              name: "Shafin Shaikh",
              role: "Senior Writer",
              bio: "Expert in artificial intelligence and machine learning."
            },
            {
              name: "Shashwat jha",
              role: "Tech Analyst",
              bio: "Focused on emerging technologies and industry trends."
            }
          ].map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + (index * 0.2), duration: 0.5 }}
              className="p-6 transition-transform duration-300 transform border shadow-lg bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border-white/20 hover:scale-105"
            >
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 text-2xl font-bold text-white rounded-full bg-gradient-to-br from-blue-400 to-purple-600">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-center text-gray-800 dark:text-white">{member.name}</h3>
              <p className="mb-3 font-medium text-center text-blue-600 dark:text-blue-400">{member.role}</p>
              <p className="text-center text-gray-600 dark:text-gray-300">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;