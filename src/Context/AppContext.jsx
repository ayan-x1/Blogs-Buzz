import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

// Create context
export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [lastDeletedBlog, setLastDeletedBlog] = useState(null);
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

  // Remove blog locally (in-memory only)
  const removeBlog = async (blogId) => {
    setLoading(true);
    let deletedBlog = null;
    let deletedIndex = -1;
    try {
      setPosts(prevPosts => {
        const idx = prevPosts.findIndex(post => post.id === blogId);
        if (idx !== -1) {
          deletedBlog = prevPosts[idx];
          deletedIndex = idx;
          const filtered = [...prevPosts];
          filtered.splice(idx, 1);
          return filtered;
        }
        return prevPosts;
      });
      setLastDeletedBlog(deletedBlog ? { blog: deletedBlog, index: deletedIndex } : null);
      return true;
    } catch (error) {
      toast.error("Error deleting blog: " + error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Restore blog at its original index (API call if supported)
  const restoreBlogAtIndex = async () => {
    if (lastDeletedBlog && lastDeletedBlog.blog && lastDeletedBlog.index >= 0) {
      // Optionally, send a POST/PUT request to restore the blog
      // For demo, just restore locally:
      setPosts(prevPosts => {
        const newPosts = [...prevPosts];
        newPosts.splice(lastDeletedBlog.index, 0, lastDeletedBlog.blog);
        return newPosts;
      });
      setLastDeletedBlog(null);
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
    removeBlog,
    lastDeletedBlog,
    restoreBlogAtIndex
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
} 