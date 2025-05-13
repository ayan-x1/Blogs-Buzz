import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../Components/Header";
import Blogs from "../Components/Blogs";
import Pagination from "../Components/Pagination";
import { AppContext } from "../Context/AppContext";

const CategoryPage = () => {
  const { category } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { fetchBlogPosts, loading, posts } = useContext(AppContext);
  
  const displayCategory = category ? category.replaceAll("-", " ") : 
    location.pathname.split("/").at(-1).replaceAll("-", " ");

  useEffect(() => {
    // Fetch blogs for this specific category
    fetchBlogPosts(1, null, displayCategory);
  }, [displayCategory, fetchBlogPosts]);

  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-white">
      <Header />
      <div className="mt-[100px] -mb-[50px] max-w-2xl mx-auto flex items-center space-x-2 w-11/12">
        <button 
          className="px-4 py-1 border-2 border-gray-300 rounded-md dark:border-gray-700 dark:text-white" 
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <h2 className="text-xl font-bold">
          Blogs Tagged <span className="text-blue-700 underline dark:text-blue-400">#{displayCategory}</span>
        </h2>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-lg">Loading posts...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-lg">No posts found in this category.</p>
        </div>
      ) : (
        <Blogs />
      )}
      
      <Pagination />
    </div>
  );
};

export default CategoryPage;