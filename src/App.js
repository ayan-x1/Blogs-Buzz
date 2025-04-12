import "./App.css";
import React, { useContext, useEffect } from "react";
import Home from "./Pages/Home";
import BlogPage from "./Pages/BlogPage";
import TagPage from "./Pages/TagPage";
import CategoryPage from "./Pages/CategoryPage";
import { AppContext } from "./Context/AppContext";
import { Routes, Route, useLocation, useSearchParams } from "react-router-dom";
import { ThemeProvider } from './Context/ThemeContext';
import EnhancedHeader from './Components/EnhancedHeader';
import AddBlog from "./Components/AddBlog";
import FeaturedBlogs from "./Pages/FeaturedBlogs";

const App = () => {
  const { fetchBlogPosts } = useContext(AppContext);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    const lastPathSegment = location.pathname.split("/").at(-1).replaceAll("-", " ");

    if (location.pathname.includes("tags")) {
      fetchBlogPosts(page, lastPathSegment, null);
    } else if (location.pathname.includes("categories")) {
      fetchBlogPosts(page, null, lastPathSegment);
    } else {
      fetchBlogPosts(page);
    }
  }, [location.pathname, location.search, fetchBlogPosts, searchParams]);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <EnhancedHeader />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:blogId" element={<BlogPage />} />
            <Route path="/tags/:tag" element={<TagPage />} />
            <Route path="/categories/:category" element={<CategoryPage />} />
            <Route path="/add-blog" element={<AddBlog />} />
            <Route path="/edit-blog/:blogId" element={<AddBlog />} />
            <Route path="/featured-blogs" element={<FeaturedBlogs />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
