import React, { createContext, useState, useCallback, useEffect, useRef } from "react";
import { baseUrl } from "../baseUrl";
import { useLocation } from "react-router-dom";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const location = useLocation();
  const initRef = useRef(false);

  const initialFeaturedPosts = [
    {
      id: 'software-engineering-2023',
      title: 'Why Software Engineering Is More Than Just Coding',
      content: `Software engineering is often thought of as just writing code, but it's so much more than that. It encompasses a wide range of skills and disciplines that go beyond just programming.

      First, software engineering involves understanding user needs and designing solutions that address those needs effectively. This requires strong analytical skills and the ability to think from the user's perspective.

      Second, software engineering includes project management aspects such as planning, estimation, risk management, and coordinating with team members. These skills are crucial for delivering software on time and within budget.

      Third, quality assurance is a critical part of software engineering. This includes writing tests, conducting code reviews, and ensuring the software meets performance and security requirements.

      Fourth, documentation is an often overlooked but essential part of software engineering. Clear and comprehensive documentation makes code maintainable and helps onboard new team members.

      Lastly, continuous learning is a fundamental aspect of software engineering. Technology evolves rapidly, and engineers must stay updated with the latest tools, frameworks, and best practices.

      In conclusion, while coding is an important skill for software engineers, it's just one piece of a much larger puzzle. The most successful software engineers are those who can balance technical expertise with project management, communication, and problem-solving skills.`,
      author: 'John Smith',
      date: 'Feb 14, 2023',
      category: 'Software Engineering',
      tags: ['Software Development', 'Agile', 'Project Management'],
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1000&q=80',
      readTime: '5 min read'
    },
    {
      id: "web-dev-career-2023",
      title: "How to Build a Successful Career in Web Development",
      content: `Web development is a rapidly growing field with many opportunities for those willing to put in the work. Building a successful career in web development requires a combination of technical skills, soft skills, and strategic career planning.

      Start by mastering the fundamentals. HTML, CSS, and JavaScript form the foundation of web development. Once you're comfortable with these, expand your knowledge by learning frameworks and libraries like React, Angular, or Vue.js for frontend development, and Node.js, Django, or Ruby on Rails for backend development.

      Build a strong portfolio. Potential employers and clients want to see what you can do. Create personal projects, contribute to open-source projects, or do pro bono work for non-profits to showcase your skills.

      Stay updated with industry trends. Web development is constantly evolving, with new tools and frameworks emerging regularly. Follow blogs, join communities, and attend meetups or conferences to stay informed.

      Develop soft skills. Communication, problem-solving, and teamwork are as important as technical skills. Learn to explain technical concepts to non-technical stakeholders and work effectively in a team.

      Network with other professionals. Join online communities, attend industry events, and connect with other developers. Networking can lead to job opportunities, collaborations, and mentorship.

      Never stop learning. The field of web development is always changing, so continuous learning is essential. Take online courses, read books, and practice regularly to keep your skills sharp.

      Consider specialization. While being a full-stack developer is valuable, specializing in a particular area like e-commerce, security, or performance optimization can make you stand out.

      By following these strategies and staying persistent, you can build a successful and rewarding career in web development.`,
      author: "Samantha Lee",
      date: "Mar 1, 2023",
      category: "Web Development",
      tags: ["Web Development", "Career", "Skills"],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80",
      readTime: "7 min read",
    },
    {
      id: "ai-ethics-2023",
      title: "The Ethics of AI: Challenges and Opportunities",
      content: `As AI becomes more pervasive in our daily lives, ethical considerations surrounding its development and use are becoming increasingly important. The rapid advancement of AI technologies presents both challenges and opportunities that need to be carefully addressed.

      One of the primary ethical challenges is bias in AI systems. AI algorithms learn from historical data, which often contains biases. If not properly addressed, these biases can be perpetuated and even amplified by AI systems, leading to unfair outcomes for certain groups.

      Privacy is another significant concern. AI systems often require large amounts of data to function effectively, raising questions about data collection, storage, and usage. Balancing the need for data with individuals' right to privacy is a complex challenge.

      Transparency and explainability are also crucial ethical considerations. Many advanced AI systems, particularly deep learning models, operate as "black boxes," making it difficult to understand how they arrive at their decisions. This lack of transparency raises concerns about accountability and trust.

      The impact of AI on employment is a further ethical issue. While AI can automate routine tasks and create new job opportunities, it may also lead to job displacement in certain sectors. Ensuring a just transition for affected workers is essential.

      Despite these challenges, AI also presents significant opportunities for positive impact. AI can be used to address global challenges such as climate change, healthcare access, and education inequality. It can help in making more accurate predictions, optimizing resource allocation, and providing personalized services.

      Responsible AI development involves creating systems that are fair, transparent, accountable, and respectful of human rights. It requires collaboration between technologists, ethicists, policymakers, and the public to establish guidelines and frameworks for the ethical use of AI.

      By addressing these ethical challenges and leveraging the opportunities, we can ensure that AI technologies benefit humanity as a whole while minimizing potential harms.`,
      author: "David Chen",
      date: "Feb 5, 2023",
      category: "AI",
      tags: ["AI", "Ethics", "Responsible AI"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80",
      readTime: "6 min read",
    },
    {
      id: "ai-trends-2023",
      title: "10 AI Trends to Watch in 2023",
      content: `As we enter a new year, it's important to take stock of where AI is heading. Here are 10 trends to watch in 2023:

      1. Responsible AI: Ethical considerations are becoming central to AI development, with increasing focus on fairness, transparency, and accountability.

      2. AI in Personalized Medicine: AI is revolutionizing healthcare by enabling personalized treatment plans based on individual patient data.

      3. Quantum Computing and AI: The integration of quantum computing is set to dramatically increase the capabilities of AI algorithms.

      4. Generative AI: Tools that can create content, from text to images to code, are becoming more sophisticated and widely used.

      5. AI in Climate Science: AI is being leveraged to model climate patterns, optimize energy usage, and develop sustainable solutions.

      6. Explainable AI (XAI): As AI systems make more critical decisions, the ability to explain their reasoning is becoming essential.

      7. Edge AI: Moving AI processing to local devices rather than the cloud is improving privacy and reducing latency.

      8. AI Regulation: Governments worldwide are developing regulatory frameworks to guide the ethical use of AI.

      9. AI for Cybersecurity: AI systems are increasingly being used to detect and respond to cyber threats in real-time.

      10. Multimodal AI: Systems that can process and understand multiple types of data (text, images, audio) are becoming more advanced.

      These trends reflect the growing maturity of AI as a field and its increasingly significant impact across industries. Organizations that stay ahead of these trends will be well-positioned to leverage AI's transformative potential while addressing its challenges.`,
      author: "Jane Doe",
      date: "Jan 2, 2023",
      category: "AI",
      tags: [
        "AI",
        "Machine Learning",
        "Deep Learning",
        "Neural Networks",
        "Natural Language Processing",
      ],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80",
      readTime: "5 min read",
    },
  ];

  // Function to generate slug from title
  const generateSlug = useCallback((title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
  }, []);

  // Function to find post by slug or ID
  const findPostBySlug = useCallback((slug) => {
    // First check current posts in state
    const currentPost = posts.find(post => {
      const postSlug = generateSlug(post.title);
      return post.id === slug || postSlug === slug;
    });
    
    if (currentPost) {
      return currentPost;
    }
    
    // Fallback to initial featured posts
    return initialFeaturedPosts.find(post => {
      const postSlug = generateSlug(post.title);
      return post.id === slug || postSlug === slug;
    });
  }, [generateSlug, posts]);

  // Function to get single post (for blog detail pages)
  const getPostBySlug = useCallback(async (slug) => {
    setLoading(true);
    
    try {
      // First check if post exists in current state
      const existingPost = findPostBySlug(slug);
      if (existingPost) {
        setLoading(false);
        return { success: true, post: existingPost };
      }
      
      // Try to fetch from API
      const response = await fetch(`${baseUrl}/${slug}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.post) {
          const postWithImage = {
            ...data.post,
            image: getTechnologyImage(data.post)
          };
          setLoading(false);
          return { success: true, post: postWithImage };
        }
      }
    } catch (error) {
      console.log('API fetch failed, checking local posts');
    }
    
    // If API fails, check initialFeaturedPosts as final fallback
    const localPost = initialFeaturedPosts.find(post => {
      const postSlug = generateSlug(post.title);
      return post.id === slug || postSlug === slug;
    });
    
    setLoading(false);
    
    if (localPost) {
      return { success: true, post: localPost };
    } else {
      return { success: false, message: 'Post not found' };
    }
  }, [findPostBySlug, generateSlug]);

  // Initialize posts on app start - this prevents the reload bug
  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      setPosts(initialFeaturedPosts);
      setIsInitialized(true);
      console.log('App initialized with featured posts');
    }
  }, []);

  // Technology-related images mapped by categories and keywords
  const getTechnologyImage = useCallback((post) => {
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
      'security': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80',
      'analytics': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'automation': 'https://images.unsplash.com/photo-1518186233392-c232efbf2373?auto=format&fit=crop&w=1200&q=80',
      'performance': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
    };

    // Default technology images
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

    // Return a random default tech image
    const randomIndex = Math.floor(Math.random() * defaultTechImages.length);
    return defaultTechImages[randomIndex];
  }, []);

  const fetchBlogPosts = useCallback(async (page = 1, tag = null, category = null) => {
    setLoading(true);
    let url = `${baseUrl}?page=${page}`;
    if (tag) url += `&tag=${tag}`;
    else if (category) url += `&category=${category}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.posts && data.posts.length > 0) {
        // Add technology-related images to posts
        const postsWithImages = data.posts.map(post => ({
          ...post,
          image: getTechnologyImage(post)
        }));
        
        setPosts(postsWithImages);
        setPage(data.page);
        setTotalPages(data.totalPages);
      } else {
        // If no posts from API, use featured posts only if not already initialized
        if (!isInitialized) {
          setPosts(initialFeaturedPosts);
          setPage(1);
          setTotalPages(1);
        }
      }
    } catch (error) {
      // If API fails, use featured posts only if not already initialized
      if (!isInitialized) {
        setPosts(initialFeaturedPosts);
        setPage(1);
        setTotalPages(1);
      }
      console.error("Error fetching posts:", error);
    }

    setLoading(false);
  }, [getTechnologyImage, isInitialized]);

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
      // Add image to new blog before sending
      const blogWithImage = {
        ...newBlog,
        image: getTechnologyImage(newBlog)
      };

      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(blogWithImage)
      });
      
      const data = await response.json();
      
      if (data.success) {
        const postWithImage = {
          ...data.post,
          image: getTechnologyImage(data.post)
        };
        setPosts(prevPosts => [postWithImage, ...prevPosts]);
        return { success: true, post: postWithImage };
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
  }, [getTechnologyImage]);

  // Edit blog post function
  const editBlog = useCallback(async (blogId, updatedBlog) => {
    setLoading(true);
    try {
      const blogWithImage = {
        ...updatedBlog,
        image: getTechnologyImage(updatedBlog)
      };

      const response = await fetch(`${baseUrl}/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(blogWithImage)
      });
      
      const data = await response.json();
      
      if (data.success) {
        const postWithImage = {
          ...data.post,
          image: getTechnologyImage(data.post)
        };
        setPosts(prevPosts => 
          prevPosts.map(post => post.id === blogId ? postWithImage : post)
        );
        return { success: true, post: postWithImage };
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
  }, [getTechnologyImage]);

  // Delete blog post function
  const deleteBlog = useCallback(async (blogId) => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/${blogId}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (data.success) {
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
    isInitialized,
    fetchBlogPosts,
    handlePageChange,
    addBlog,
    editBlog,
    deleteBlog,
    getPostBySlug,
    findPostBySlug,
    initialFeaturedPosts,
    generateSlug
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}