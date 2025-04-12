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

  const value = {
    posts,
    loading,
    page,
    totalPages,
    fetchBlogPosts,
    handlePageChange,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
