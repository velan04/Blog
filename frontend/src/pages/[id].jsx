import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import apicall from '../../untils/apicall';
import { useParams } from 'react-router-dom';

const Blog = () => {
    const id = useParams().id;
    const [blog, setBlog] = useState([]);

    useEffect(() => {
      const fetchBlog = async () => {
        try {
          const response = await fetch(`${apicall}/blog/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch blog');
          }
          const data = await response.json();
          setBlog(data);
        } catch (error) {
          console.error('Error fetching blog:', error);
        }
      };
      fetchBlog();
    }, [])
    console.log(blog)
  return (<>
    <Header />
    {/* Full video player */}
    <div className="container mx-auto p-4  w-full">
      {blog.length === 0 && <div className="text-center mt-36">No blogs found.</div>}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full md:flex">
              <video
                autoPlay
                controls
                src={blog.image}
                className="w-[900px] h-[500px]"
              />
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-1">{blog.title}</h2>
              <p className="text-gray-500 text-sm mb-2">{blog.content}</p>
              <p className="text-gray-600 text-sm mb-2"><span className='font-bold'>Author:</span> {blog.authorName}</p>
              <p className="text-gray-600 text-sm mb-2"><span className='font-bold'>Date:</span> {new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

  
  </>)
}

export default Blog