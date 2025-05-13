import React, { createContext, useState, useCallback } from "react";
import { baseUrl } from "../baseUrl";
import { useLocation } from "react-router-dom";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const location = useLocation();

  const fetchBlogPosts = useCallback(async (page = 1, tag = null, category = null) => {
    setLoading(true);
    let url = `${baseUrl}?page=${page}`;
    if (tag) url += `&tag=${tag}`;
    else if (category) url += `&category=${category}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.posts && data.posts.length > 0) {
        setPosts(data.posts);
        setPage(data.page);
        setTotalPages(data.totalPages);
      } else {
        setPosts([]);
        console.error("No posts found.");
      }
    } catch (error) {
      setPosts([]);
      console.error("Error fetching posts:", error);
    }

    setLoading(false);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
    const lastPathSegment = location.pathname.split("/").at(-1).replaceAll("-", " ");

    if (location.pathname.includes("tags")) {
      fetchBlogPosts(newPage, lastPathSegment, null);
    } else if (location.pathname.includes("categories")) {
      fetchBlogPosts(newPage, null, lastPathSegment);
    } else {
      fetchBlogPosts(newPage);
    }
  }, [fetchBlogPosts, location.pathname]);

  // Add new blog post function
  const addBlog = useCallback(async (newBlog) => {
    setLoading(true);
    try {
      // Format the request for your API
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBlog)
      });
      
      const data = await response.json();
      
      if (data.success) {
        // If you want to update the post list immediately
        setPosts(prevPosts => [data.post, ...prevPosts]);
        return { success: true, post: data.post };
      } else {
        console.error("Failed to add blog:", data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error adding blog:", error);
      return { success: false, message: "Server error occurred" };
    } finally {
      setLoading(false);
    }
  }, []);

  // Edit blog post function
  const editBlog = useCallback(async (blogId, updatedBlog) => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedBlog)
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Update the post in the current posts list
        setPosts(prevPosts => 
          prevPosts.map(post => post.id === blogId ? data.post : post)
        );
        return { success: true, post: data.post };
      } else {
        console.error("Failed to update blog:", data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      return { success: false, message: "Server error occurred" };
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete blog post function
  const deleteBlog = useCallback(async (blogId) => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/${blogId}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Remove the post from the current posts list
        setPosts(prevPosts => prevPosts.filter(post => post.id !== blogId));
        return { success: true };
      } else {
        console.error("Failed to delete blog:", data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      return { success: false, message: "Server error occurred" };
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    posts,
    loading,
    page,
    totalPages,
    fetchBlogPosts,
    handlePageChange,
    addBlog,
    editBlog,
    deleteBlog
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}