const mongoose = require("mongoose");

const DraftSchema = new mongoose.Schema({
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
  replyCount: Number,
});

const Draft = mongoose.model("drafts", DraftSchema);

module.exports = Draft;
