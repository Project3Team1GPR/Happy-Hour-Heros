const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const User = require('./User');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
