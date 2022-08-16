const userController = require("./user.controller");
const articleController = require("./article.controller");
const uploadController = require("./upload.controller");
const commentsController = require("./comments.controller");
const classifyController = require("./classify.controller");
const userInfoController = require("./userInfo.controller");

const { registerCtr, loginCtr, updateInfoCtr, getUserInfoCtr } = userController;

const {
  createArticleCtr,
  getArticleListCtr,
  getArticleByIdCtr,
  deleteArticleCtr,
  likeArticleCtr,
  updateArticleCtr,
  searchArticleCtr,
  getArticleByRandomCtr,
} = articleController;

const { uploadFileCtr } = uploadController;

const { createCommentsCtr, findCommentsById, giveLikeCtr, deleteCommentCtr } =
  commentsController;

const { getClassifyListCtr, getTagListCtr, getTimelineListCtr } =
  classifyController;

const { getMyArticleListCtr, getLikeArticleListCtr } = userInfoController;

module.exports = {
  registerCtr,
  loginCtr,
  updateInfoCtr,
  getUserInfoCtr,
  uploadFileCtr,
  createArticleCtr,
  getArticleListCtr,
  getArticleByIdCtr,
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
};
