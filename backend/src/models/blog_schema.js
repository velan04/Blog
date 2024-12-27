const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  image: { type: String },
  title: { type: String, required: true },
  content: { type: String, required: true },
  published: { type: Boolean, default: false },
  authorName: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  user: { type: String, required: true }
});

module.exports = mongoose.model('Blog', blogSchema);
