import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BlogPage = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();

  // This is a mock database of blog posts
  // In a real application, you would fetch this from an API or context
  const blogPosts = [
    {
      id: "software-engineering-2023",
      title: "Why Software Engineering Is More Than Just Coding",
      content: `Software engineering is often thought of as just writing code, but it's so much more than that. It encompasses a wide range of skills and disciplines that go beyond just programming.

      First, software engineering involves understanding user needs and designing solutions that address those needs effectively. This requires strong analytical skills and the ability to think from the user's perspective.

      Second, software engineering includes project management aspects such as planning, estimation, risk management, and coordinating with team members. These skills are crucial for delivering software on time and within budget.

      Third, quality assurance is a critical part of software engineering. This includes writing tests, conducting code reviews, and ensuring the software meets performance and security requirements.

      Fourth, documentation is an often overlooked but essential part of software engineering. Clear and comprehensive documentation makes code maintainable and helps onboard new team members.

      Lastly, continuous learning is a fundamental aspect of software engineering. Technology evolves rapidly, and engineers must stay updated with the latest tools, frameworks, and best practices.

      In conclusion, while coding is an important skill for software engineers, it's just one piece of a much larger puzzle. The most successful software engineers are those who can balance technical expertise with project management, communication, and problem-solving skills.`,
      author: "John Smith",
      date: "Feb 14, 2023",
      category: "Software Engineering",
      tags: ["Software Development", "Agile", "Project Management"],
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1000&q=80",
      readTime: "5 min read",
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
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80",
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
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80",
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
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80",
      readTime: "5 min read",
    },
  ];

  // Find the blog post with the matching ID
  const post = blogPosts.find((post) => post.id === blogId);

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h2 className="mb-4 text-3xl font-bold">Post not found</h2>
          <p className="mb-6 text-gray-300">
            The blog post you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/featured-blogs")}
            className="px-4 py-2 transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Back to Featured Blogs
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white bg-gray-900">
      <div className="container px-4 py-8 mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 mb-8 transition-colors bg-gray-800 rounded-lg hover:bg-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
          Back
        </button>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Hero Image */}
          <div className="relative mb-8 overflow-hidden h-96 rounded-xl">
            <img
              src={
                post.image ||
                "https://source.unsplash.com/random/1200x600/?technology"
              }
              alt={post.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Meta Information */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="px-3 py-1 text-sm font-medium text-blue-300 bg-blue-900 rounded-full">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              {post.category && (
                <span className="px-3 py-1 text-sm font-medium text-purple-300 bg-purple-900 rounded-full">
                  {post.category}
                </span>
              )}
            </div>

            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              {post.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 mr-4 text-xl font-bold bg-gray-700 rounded-full">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="text-lg font-medium">{post.author}</p>
                <p className="text-sm text-gray-400">
                  {post.readTime || "5 min read"}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            {post.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed text-gray-300">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-8 mt-12 border-t border-gray-700">
            <h3 className="mb-4 text-lg font-semibold">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags &&
                post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm font-medium text-gray-300 bg-gray-800 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default BlogPage;
