import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import apicall from '../../untils/apicall';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Myblog = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const myBlog = blogs.filter((blog) => blog.user === user)

  useEffect(() => {
    // Fetch user authentication state
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/login');
        console.log("No user is signed in.");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch blogs from the API
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${apicall}blog`);
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        } else {
          console.error("Failed to fetch blogs:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);


  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await fetch(`${apicall}blog`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Blog created:', result);
        toast.success('Blog created successfully');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.error('Error creating blog:', response.statusText);
        toast.error('Failed to create blog');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <ToastContainer position="top-center" />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">My Videos</h1>
        {myBlog.length === 0 && <div className="text-center mt-36">No blogs found.</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-20">
          {blogs
            .filter((blog) => blog.user === user)
            .map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
              >
                {blog.image.endsWith('.mp4') || blog.image.endsWith('.webm') || blog.image.endsWith('.ogg') ? (
                  <video
                    autoPlay
                    loop
                    muted
                    src={blog.image}
                    className="w-full h-60 object-cover"
                  />
                ) : (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-60 object-cover"
                  />
                )}
                <div className=" h-40 p-2">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-1">{blog.title}</h2>
                  <p className="text-gray-500 text-sm mb-2 line-clamp-2">{blog.content}</p>
                  <p className="text-gray-600 text-sm mb-2"><span className='font-bold'>Author:</span> {blog.authorName}</p>
                  <p className="text-gray-600 text-sm mb-2"><span className='font-bold'>Date:</span> {new Date(blog.createdAt).toLocaleDateString()}</p>
                  <button
                    className="px-4 py-2 absolute bottom-2 right-2 bg-gradient-to-r from-red-500 to-red-400 text-white font-semibold rounded-lg transition duration-300 hover:bg-gradient-to-l
                    hover:from-red-400 hover:to-red-500">
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <button
        className="fixed bottom-5 right-5 bg-gradient-to-r from-blue-500 to-indigo-600 
        p-5 rounded-xl" onClick={handlePopup}>
        {showPopup ? <IoCloseSharp className="text-white text-2xl font-bold" /> : <FaPlus className="text-white text-2xl" />}
      </button>

      {/* PopupModel */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={handlePopup}
            >
              <IoCloseSharp  className='text-2xl'/>
            </button>
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create a New Blog</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit} method="POST">
              <div>
                <label className="block text-sm font-medium text-gray-700">Upload Video</label>
                <input
                  type="file"
                  accept="video/*"
                  name="image"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter the title"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  name="content"
                  placeholder="Write your content here"
                  rows="5"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Account Name</label>
                <input
                  type="text"
                  name="author"
                  value={user.displayName}
                  readOnly
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Default UserID</label>
                <input
                  type="text"
                  name="user"
                  value={user.uid}
                  readOnly
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Post Blog
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Myblog;
