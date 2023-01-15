const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
  articleId: String,
  userId: String,
  username: String,
  avatarUrl: String,
  date: Number,
  content: String,
  fromUserId: String,
  likeCount: Number,
  replyCount: Number,
  isLike: Boolean,
  isDelete: Boolean,
  headUrl: String,
  replyList: [
    {
      userId: String,
      username: String,
      avatarUrl: String,
      date: Number,
      fromUserId: String,
      fromUsername: String,
      formContent: String,
      content: String,
      likeCount: Number,
      isLike: Boolean,
      replyCount: Number,
      fromCommentId: String,
      isDelete: Boolean,
      headUrl: String,
    },
  ],
});

const Comments = mongoose.model("comments", CommentsSchema, 'comments');

module.exports = Comments;
