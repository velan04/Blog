const Blog = require('../models/blog_schema');

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyBlogs = async (req, res) => {
  try {
    const uid = req.user.uid; // Assuming the `uid` is extracted from the Firebase token.
    const blogs = await Blog.find({ uid }); // Fetch blogs for the authenticated user.
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBlog = async (req, res) => {
  const { title, author, content, user } = req.body; // Expecting JSON body
  const image = req.file ? `/${req.file.filename}` : null;

  if (!title || !author || !content) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newBlog = new Blog({
    title,
    authorName: author,  // Adjust according to the schema field name
    content,
    user,
    published: false, // Or based on any default value you want
    image: image, // Adjust according to the schema field name
  });

  try {
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog); // Respond with the created blog
  } catch (error) {
    console.error('Error creating blog:', error);  // Log the error
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


const updateBlog = async (req, res) => {
  res.send("Update Blog")
};

const deleteBlog = async (req, res) => {
  res.send("Delete Blog")
};

module.exports = {
  getBlogs,
  getMyBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
