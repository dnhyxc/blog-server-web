import mongoose from "mongoose";

const likeArticleSchema = new mongoose.Schema({
  userId: String,
  articleId: String,
});

const LikeArticle = mongoose.model("likeArticles", likeArticleSchema);

export default LikeArticle;
