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


  // Enhanced technology image assignment function
  const getTechnologyImage = (post) => {
    const categoryImages = {
      'AI': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
      'Machine Learning': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80',
      'Deep Learning': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
      'Neural Networks': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      'Natural Language Processing': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      'Web Development': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
      'Software Engineering': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
      'Data Science': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'Blockchain': 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
      'Cybersecurity': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
      'Cloud Computing': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
      'Mobile Development': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
      'DevOps': 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1200&q=80',
      'Programming': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'
    };

    // Keyword-based image mapping for more specific content
    const keywordImages = {
      'react': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
      'javascript': 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=1200&q=80',
      'python': 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80',
      'nodejs': 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=1200&q=80',
      'database': 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80',
      'api': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      'frontend': 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80',
      'backend': 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
      'css': 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?auto=format&fit=crop&w=1200&q=80',
      'html': 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80',
      'docker': 'https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=1200&q=80',
      'kubernetes': 'https://images.unsplash.com/photo-1667372393086-9d4001d51cf1?auto=format&fit=crop&w=1200&q=80',
      'git': 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=1200&q=80',
      'testing': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      'career': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
      'trends': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'ethics': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
      'coding': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      'engineering': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80'
    };

    // Default technology images for fallback
    const defaultTechImages = [
      'https://images.unsplash.com/photo-1518186233392-c232efbf2373?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80'
    ];

    // If post already has an image, keep it
    if (post.image && post.image.trim() !== '') {
      return post.image;
    }

    // Check category first
    if (post.category && categoryImages[post.category]) {
      return categoryImages[post.category];
    }

    // Check title and content for keywords
    const titleAndContent = `${post.title || ''} ${post.content || ''}`.toLowerCase();

    for (const [keyword, imageUrl] of Object.entries(keywordImages)) {
      if (titleAndContent.includes(keyword)) {
        return imageUrl;
      }
    }

    // Check tags for keywords
    if (post.tags && Array.isArray(post.tags)) {
      for (const tag of post.tags) {
        const tagLower = tag.toLowerCase();
        if (keywordImages[tagLower]) {
          return keywordImages[tagLower];
        }
        if (categoryImages[tag]) {
          return categoryImages[tag];
        }
      }
    }

    // For specific posts based on ID or create a hash-based selection for consistency
    const postId = post.id || post.title || 'default';
    const hashCode = postId.toString().split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const imageIndex = Math.abs(hashCode) % defaultTechImages.length;

    return defaultTechImages[imageIndex];
  };

  // Fetch blog data with enhanced image assignment
  const fetchBlogPosts = async (page = 1, tag = null, category = null) => {
    setLoading(true);
    let url = `${baseUrl}?page=${page}`;
    if (tag) {
      url += `&tag=${tag}`;
    }
    if (category) {
      url += `&category=${category}`;
    }
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!data.posts || !data.totalPages) {
        throw new Error("Data format incorrect");
      }

      // Apply smart image assignment to all posts
      const postsWithImages = data.posts.map(post => ({
        ...post,
        image: getTechnologyImage(post)
      }));

      setPosts(postsWithImages);
      setPage(data.page);
      setTotalPages(data.totalPages);
    }
    catch (error) {
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

  // Add new blog with image assignment
  const addBlog = async (newBlog) => {
    setLoading(true);
    try {
      // Assign appropriate image to new blog
      const blogWithImage = {
        ...newBlog,
        id: Date.now(), // Generate temporary ID
        image: getTechnologyImage(newBlog)
      };

      setPosts(prevPosts => [blogWithImage, ...prevPosts]);
      toast.success('Blog added successfully!');
      return true;
    } catch (error) {
      console.error("Error adding blog:", error);
      toast.error('Failed to add blog');
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
      toast.success('Blog deleted successfully');
      return true;
    } catch (error) {
      toast.error("Error deleting blog: " + error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Restore blog at its original index
  const restoreBlogAtIndex = async () => {
    if (lastDeletedBlog && lastDeletedBlog.blog && lastDeletedBlog.index >= 0) {
      setPosts(prevPosts => {
        const newPosts = [...prevPosts];
        newPosts.splice(lastDeletedBlog.index, 0, lastDeletedBlog.blog);
        return newPosts;
      });
      setLastDeletedBlog(null);
      toast.success('Blog restored successfully');
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