import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  userId: String,
  likeCommentId: String,
});

const Like = mongoose.model("likes", likeSchema);

export default Like;
