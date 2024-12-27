import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import { auth } from '../components/firebase';
import apicall from '../../untils/apicall';

const Home = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login');
      } else {
        fetchBlogs(user);
      }
    });

    // Fetch blogs function
    const fetchBlogs = async (user) => {
      try {
        const token = await user.getIdToken();
        const response = await fetch(`${apicall}/blog`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch blogs');
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <div className="text-center mt-10">Loading blogs...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  console.log(user.displayName)

  return (
    <>
      <Header />
      {/* Blog card section */}
      <div className="container mx-auto p-4">
        {blogs.length === 0 && <div className="text-center mt-36">No blogs found.</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform 
                hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
              onClick={() => navigate(`/blogs/${blog._id}`)}
            >
              <div className="relative">
                {blog.image.endsWith('.mp4') || blog.image.endsWith('.webm') || blog.image.endsWith('.ogg') ? (
                  <video
                    muted
                    src={blog.image}
                    className="w-full aspect-video object-cover"
                  />
                ) : (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full aspect-video object-cover"
                  />
                )}
                {/* Optional duration overlay
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {blog.duration || "0:00"}
                </div> */}
              </div>
              <div className="p-3">
                <p className="text-gray-800 text-sm font-semibold mt-1 line-clamp-2">{blog.content}</p>
                <h2 className="text-md font-medium text-gray-500 line-clamp-2">{blog.title}</h2>
                <div className="flex items-center justify-between text-gray-600 text-xs mt-2">
                  <p>
                    <span className="font-bold"></span> {blog.authorName}
                  </p>
                  <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
