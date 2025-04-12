import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";
import { useNavigate } from "react-router-dom";

// Create context
export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const navigate = useNavigate();

  // Fetch blog data
  const fetchBlogPosts = async (page = 1, tag = null, category = null) => {
    setLoading(true);
    let url = `${baseUrl}?page=${page}`;
    if(tag) {
      url += `&tag=${tag}`;
    }
    if(category) {
      url += `&category=${category}`;
    }
    try {
      const res = await fetch(url);
      const data = await res.json();
      if(!data.posts || !data.totalPages) {
        throw new Error("Data format incorrect");
      }
      setPosts(data.posts);
      setPage(data.page);
      setTotalPages(data.totalPages);
    }
    catch(error) {
      console.log("Error in fetching blogPosts", error);
      setPosts([]);
      setPage(1);
      setTotalPages(null);
    }
    setLoading(false);
  };

  // Handle page change
  const handlePageChange = (page) => {
    navigate({ search: `?page=${page}` });
    setPage(page);
  };

  // Add new blog
  const addBlog = async (newBlog) => {
    setLoading(true);
    try {
      // In a real app, you would make an API call here
      setPosts(prevPosts => [newBlog, ...prevPosts]);
      return true;
    } catch (error) {
      console.error("Error adding blog:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Remove blog
  const removeBlog = async (blogId) => {
    setLoading(true);
    try {
      // In a real app, you would make an API call here
      setPosts(prevPosts => prevPosts.filter(post => post.id !== blogId));
      return true;
    } catch (error) {
      console.error("Error removing blog:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    posts,
    setPosts,
    loading,
    setLoading,
    page,
    setPage,
    totalPages,
    setTotalPages,
    fetchBlogPosts,
    handlePageChange,
    addBlog,
    removeBlog
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
} 