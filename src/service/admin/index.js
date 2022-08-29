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
  delAllArticle,
  getPrevArticle,
  getNextArticle,
  getArticleTotal,
  updateReplyCount,
} = require("./article.service");

module.exports = {
  // 用户
  findOneUser,
  findUserById,
  createUserServer,
  updateUser,
  // 文章
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
};
