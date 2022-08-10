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
  updateArticle,
  deleteArticles,
  likeArticle,
  checkLikeStatus,
  getArticleListWithTotal,
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

// const { findOneUser, findUserById, createUserServer, updateUser } = userService;
// const {
//   createArticle,
//   findArticles,
//   findArticleById,
//   updateArticle,
//   deleteArticles,
//   likeArticle,
//   checkLikeStatus,
//   getArticleListWithTotal,
// } = articleService;

// const {
//   createComments,
//   findCommentById,
//   updateComments,
//   giveLike,
//   deleteComment,
// } = commentsService;

// const { createLike } = likeService;

// const { checkLikeArticle } = likeArticleService;

// const { getClassifyList, getTagList, getTimelineList } = classifyService;

// const { getMyArticleList, getLikeArticleList } = userInfoServer;

module.exports = {
  findOneUser,
  findUserById,
  updateUser,
  createUserServer,
  createArticle,
  findArticles,
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
};
