import mongoose from "mongoose";

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
    },
  ],
});

const Comments = mongoose.model("comments", CommentsSchema);

export default Comments;
