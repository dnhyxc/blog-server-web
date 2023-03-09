const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  content: {
    required: true,
    type: String,
  },
  classify: {
    required: true,
    type: String,
  },
  tag: {
    required: true,
    type: String,
  },
  coverImage: String,
  abstract: String,
  createTime: Number,
  authorId: String,
  authorName: String,
  isDelete: Boolean,
  isLike: Boolean,
  likeCount: Number,
  readCount: Number,
  collectCount: Number,
});

const Article = mongoose.model("articles", ArticleSchema);

module.exports = Article;
