import "./App.css";
import React, { useContext, useEffect } from "react";
import Home from "./Pages/Home";
import BlogPage from "./Pages/BlogPage";
import TagPage from "./Pages/TagPage";
import CategoryPage from "./Pages/CategoryPage";
import FeaturedBlogs from "./Pages/FeaturedBlogs";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import { AppContext } from "./Context/AppContext";
import { Routes, Route, useLocation, useSearchParams } from "react-router-dom";
import { ThemeProvider } from './Context/ThemeContext';
import EnhancedHeader from './Components/EnhancedHeader';
import AddBlog from "./Components/AddBlog";

const App = () => {
  const { fetchBlogPosts } = useContext(AppContext);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Skip fetch if we're on add-blog or edit-blog pages
    if (location.pathname.includes("/add-blog") || location.pathname.includes("/edit-blog")) {
      return;
    }
    
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
      <div className="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-900 dark:text-white">
        <EnhancedHeader />
        <main className="container px-4 py-8 mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:blogId" element={<BlogPage />} />
            <Route path="/tags/:tag" element={<TagPage />} />
            <Route path="/categories/:category" element={<CategoryPage />} />
            <Route path="/add-blog" element={<AddBlog />} />
            <Route path="/edit-blog/:blogId" element={<AddBlog isEditMode={true} />} />
            <Route path="/featured-blogs" element={<FeaturedBlogs />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;