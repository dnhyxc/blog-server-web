const userController = require("./web/user.controller");
const articleController = require("./web/article.controller");
const uploadController = require("./web/upload.controller");
const commentsController = require("./web/comments.controller");
const classifyController = require("./web/classify.controller");
const userInfoController = require("./web/userInfo.controller");
const draftController = require("./web/draft.controller");

// 后台用户控制器
const adminUserController = require("./admin/user.controller");
const adminArticleController = require("./admin/article.controller");

// 前台控制器
const { registerCtr, loginCtr, updateInfoCtr, resetPwdCtr, getUserInfoCtr, verifyTokenCtr } =
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
const {
  createCommentsCtr,
  findCommentsByIdCtr,
  giveLikeCtr,
  deleteCommentCtr,
} = commentsController;
const { getClassifyListCtr, getTagListCtr, getTimelineListCtr } =
  classifyController;
const {
  getMyArticleListCtr,
  getLikeArticleListCtr,
  getAuthorArticleListCtr,
  getAuthorLikeArticlesCtr,
  getAuthorTimelineCtr,
} = userInfoController;
const {
  createDraftCtr,
  updateDraftCtr,
  deleteDraftCtr,
  getDraftListCtr,
  getDraftByIdCtr,
} = draftController;

// 后台控制器
const {
  adminRegisterCtr,
  adminLoginCtr,
  adminGetUserInfoCtr,
  adminUpdateInfoCtr,
  adminVerifyTokenCtr,
  adminGetUserListCtr,
  adminBatchDeleteUserCtr,
  adminSetAuthCtr,
} = adminUserController;
// 后台文章控制器
const {
  adminCreateArticleCtr,
  adminUpdateArticleCtr,
  adminDeleteArticleCtr,
  adminGetArticleListCtr,
  adminSearchArticleCtr,
  adminGetArticleByIdCtr,
  adminBatchDeleteArticleCtr,
  adminShelvesArticleCtr,
  adminFindCommentsByIdCtr,
  adminDeleteCommentCtr,
  adminRestoreCommentCtr,
} = adminArticleController;

module.exports = {
  // 前台控制器
  registerCtr,
  loginCtr,
  updateInfoCtr,
  resetPwdCtr,
  getUserInfoCtr,
  uploadFileCtr,
  createArticleCtr,
  getArticleListCtr,
  getArticleByIdCtr,
  delAllArticleCtr,
  createCommentsCtr,
  findCommentsByIdCtr,
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
  createDraftCtr,
  updateDraftCtr,
  deleteDraftCtr,
  getDraftListCtr,
  getDraftByIdCtr,

  // 后台用户控制器
  adminRegisterCtr,
  adminLoginCtr,
  adminGetUserInfoCtr,
  adminUpdateInfoCtr,
  adminVerifyTokenCtr,
  adminGetUserListCtr,
  adminBatchDeleteUserCtr,
  adminSetAuthCtr,
  // 后台文章控制器
  adminCreateArticleCtr,
  adminUpdateArticleCtr,
  adminDeleteArticleCtr,
  adminGetArticleListCtr,
  adminSearchArticleCtr,
  adminGetArticleByIdCtr,
  adminBatchDeleteArticleCtr,
  adminShelvesArticleCtr,
  adminFindCommentsByIdCtr,
  adminDeleteCommentCtr,
  adminRestoreCommentCtr,
};
