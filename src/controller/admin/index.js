const userController = require("./user.controller");
const articleController = require("./article.controller");

const { registerCtr, loginCtr, updateInfoCtr, getUserInfoCtr, verifyTokenCtr } =
  userController;

const {
  createArticleCtr,
  getArticleListCtr,
  getArticleByIdCtr,
  deleteArticleCtr,
  likeArticleCtr,
  updateArticleCtr,
  searchArticleCtr,
  getArticleByRandomCtr,
  delAllArticleCtr,
  getPrevArticleCtr,
  getNextArticleCtr,
} = articleController;

module.exports = {
  // 用户
  registerCtr,
  loginCtr,
  updateInfoCtr,
  getUserInfoCtr,
  verifyTokenCtr,
  // 文章
  createArticleCtr,
  getArticleListCtr,
  getArticleByIdCtr,
  deleteArticleCtr,
  likeArticleCtr,
  updateArticleCtr,
  searchArticleCtr,
  getArticleByRandomCtr,
  delAllArticleCtr,
  getPrevArticleCtr,
  getNextArticleCtr,
};
