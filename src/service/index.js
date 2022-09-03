const {
  findOneUser,
  findUserById,
  createUserServer,
  updateUser,
} = require("./web/user.service");
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
  delAllArticle,
  getPrevArticle,
  getNextArticle,
  getArticleTotal,
  updateReplyCount,
  updateAuthorName,
} = require("./web/article.service");
const {
  createComments,
  findCommentById,
  updateComments,
  giveLike,
  deleteComment,
} = require("./web/comments.service");
const { createLike } = require("./web/like.service");
const { checkLikeArticle } = require("./web/likeArticle.service");
const {
  getClassifyList,
  getTagList,
  getTimelineList,
} = require("./web/classify.service");
const {
  getMyArticleList,
  getLikeArticleList,
} = require("./web/userInfo.service");

// 后台数据库接口
const {
  adminFindOneUser,
  adminFindUserById,
  adminUpdateUser,
  adminCreateUserServer,
  adminGetUserList,
  adminBatchDeleteUser,
  adminSetAuth,
} = require("./admin/user.service");

const {
  adminCreateArticle,
  adminUpdateArticle,
  adminDeleteArticles,
  adminFindArticles,
  adminFindArticleById,
  adminGetArticleTotal,
  adminBatchDeleteArticle,
  adminShelvesArticle,
  adminFindCommentById,
  adminDeleteComment,
} = require("./admin/article.service");

module.exports = {
  // 前台用户
  findOneUser,
  findUserById,
  updateUser,
  createUserServer,
  // 前台文章
  createArticle,
  findArticles,
  delAllArticle,
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
  getPrevArticle,
  getNextArticle,
  getArticleTotal,
  updateReplyCount,
  updateAuthorName,

  // 后台
  adminFindOneUser,
  adminFindUserById,
  adminCreateUserServer,
  adminUpdateUser,
  adminGetUserList,
  adminBatchDeleteUser,
  adminSetAuth,
  // 后台文章
  adminCreateArticle,
  adminUpdateArticle,
  adminDeleteArticles,
  adminFindArticles,
  adminFindArticleById,
  adminGetArticleTotal,
  adminBatchDeleteArticle,
  adminShelvesArticle,
  adminFindCommentById,
  adminDeleteComment,
};
