const userController = require("./web/user.controller");
const articleController = require("./web/article.controller");
const uploadController = require("./web/upload.controller");
const commentsController = require("./web/comments.controller");
const classifyController = require("./web/classify.controller");
const userInfoController = require("./web/userInfo.controller");

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

const { uploadFileCtr } = uploadController;

const { createCommentsCtr, findCommentsById, giveLikeCtr, deleteCommentCtr } =
  commentsController;

const { getClassifyListCtr, getTagListCtr, getTimelineListCtr } =
  classifyController;

const {
  getMyArticleListCtr,
  getLikeArticleListCtr,
  getAuthorArticleListCtr,
  getAuthorLikeArticlesCtr,
  getAuthorTimelineCtr,
} = userInfoController;

module.exports = {
  registerCtr,
  loginCtr,
  updateInfoCtr,
  getUserInfoCtr,
  uploadFileCtr,
  createArticleCtr,
  getArticleListCtr,
  getArticleByIdCtr,
  delAllArticleCtr,
  createCommentsCtr,
  findCommentsById,
  giveLikeCtr,
  deleteCommentCtr,
  deleteArticleCtr,
  likeArticleCtr,
  updateArticleCtr,
  searchArticleCtr,
  getClassifyListCtr,
  getTagListCtr,
  getTimelineListCtr,
  getMyArticleListCtr,
  getLikeArticleListCtr,
  getArticleByRandomCtr,
  getAuthorArticleListCtr,
  getAuthorLikeArticlesCtr,
  getAuthorTimelineCtr,
  getPrevArticleCtr,
  getNextArticleCtr,
  verifyTokenCtr,
};
