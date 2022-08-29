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

const { getMyArticleList, getLikeArticleList } = require("./web/userInfo.service");

module.exports = {
  findOneUser,
  findUserById,
  updateUser,
  createUserServer,
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
};
