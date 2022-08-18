const {
  findOneUser,
  findUserById,
  createUserServer,
  updateUser,
} = require("./user.service");

const {
  createArticle,
  findArticles,
  findArticleById,
  getLikeArticles,
  updateArticle,
  deleteArticles,
  likeArticle,
  checkLikeStatus,
  getArticleListWithTotal,
  getArticleByRandom,
} = require("./article.service");

const {
  createComments,
  findCommentById,
  updateComments,
  giveLike,
  deleteComment,
} = require("./comments.service");

const { createLike } = require("./like.service");

const { checkLikeArticle } = require("./likeArticle.service");
const {
  getClassifyList,
  getTagList,
  getTimelineList,
} = require("./classify.service");
const { getMyArticleList, getLikeArticleList } = require("./userInfo.service");

module.exports = {
  findOneUser,
  findUserById,
  updateUser,
  createUserServer,
  createArticle,
  findArticles,
  getLikeArticles,
  findArticleById,
  updateArticle,
  createComments,
  findCommentById,
  updateComments,
  giveLike,
  createLike,
  deleteComment,
  deleteArticles,
  likeArticle,
  checkLikeArticle,
  getClassifyList,
  getTagList,
  getTimelineList,
  checkLikeStatus,
  getArticleListWithTotal,
  getMyArticleList,
  getLikeArticleList,
  getArticleByRandom,
};