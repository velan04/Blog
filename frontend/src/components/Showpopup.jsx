import React from 'react'

const Showpopup = ({ isOpen, handleClose, handleSubmit, user }) => {
    if (!isOpen) return null;
    
  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
              <button
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                  onClick={handleClose}
              >
                  &times;
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
                      <label className="block text-sm font-medium text-gray-700">Author Name</label>
                      <input
                          type="text"
                          name="author"
                          placeholder="Enter the Author Name"
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
                      <label className="block text-sm font-medium text-gray-700">Default UserID</label>
                      <input
                          type="text"
                          name="user"
                          value={user}
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
  )
}

export default Showpopup