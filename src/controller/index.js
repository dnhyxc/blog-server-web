const userController = require("./web/user.controller");
const articleController = require("./web/article.controller");
const uploadController = require("./web/upload.controller");
const commentsController = require("./web/comments.controller");
const classifyController = require("./web/classify.controller");
const userInfoController = require("./web/userInfo.controller");
const draftController = require("./web/draft.controller");
const collectionController = require("./web/collection.controller");
const messageController = require("./web/message.controller");
const interactController = require("./web/interact.controller");
const followController = require("./web/follow.controller");
const atlasController = require("./web/atlas.controller");

// 后台用户控制器
const adminUserController = require("./admin/user.controller");
const adminArticleController = require("./admin/article.controller");
const adminPageConfigController = require("./admin/config.controller");
const adminGetInteractController = require("./admin/interact.controller");
const adminClassifyController = require("./admin/classify.controller");
const adminToolsController = require("./admin/tools.controller");
const adminStatisticsController = require("./admin/statistics.controller");

// 前台控制器
const {
  registerCtr,
  loginCtr,
  updateInfoCtr,
  resetPwdCtr,
  logoutCtr,
  getUserInfoCtr,
  verifyTokenCtr,
} = userController;

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
  advancedSearchCtr,
  getLikenessArticlesCtr,
  checkArticleLikeStatusCtr,
} = articleController;

const { uploadFileCtr, removeFileCtr, downLoadFileCtr } = uploadController;

const {
  createCommentsCtr,
  findCommentsByIdCtr,
  giveLikeCtr,
  deleteCommentCtr,
} = commentsController;

const {
  getClassifyListCtr,
  getTagListCtr,
  getTimelineListCtr,
  getAddedClassifysCtr,
} = classifyController;

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

const {
  createCollectionCtr,
  getCollectionListCtr,
  collectArticlesCtr,
  checkCollectionStatusCtr,
  cancelCollectedCtr,
  getCollectedTotalCtr,
  delCollectionCtr,
  updateCollectionCtr,
  getCollectInfoCtr,
  getCollectArticlesCtr,
  removeCollectArticleCtr,
  getCollectTotalCtr,
} = collectionController;

const {
  getMessageListCtr,
  setReadStatusCtr,
  getNoReadMsgCountCtr,
  deleteMessageCtr,
  deleteAllMessageCtr,
} = messageController;

const {
  createInteractCtr,
  getInteractsCtr,
  getInteractListCtr,
  removeInteractsCtr,
  delInteractsCtr,
} = interactController;

const { manageFollowCtr, getFollowListCtr, findFollowedCtr } = followController;

const { addAtlasImagesCtr, getAtlasListCtr, deleteAtlasImagesCtr } =
  atlasController;

// 后台控制器
const {
  adminRegisterCtr,
  adminLoginCtr,
  adminGetUserInfoCtr,
  adminUpdateInfoCtr,
  adminVerifyTokenCtr,
  adminGetUserListCtr,
  adminGetAdminUserListCtr,
  adminBatchDeleteUserCtr,
  adminUpdateAdminUsersCtr,
  adminDeleteAdminUsersCtr,
  adminSetAuthCtr,
  adminSetAdminUserAuthCtr,
  adminUpdateUsersCtr,
  bindAccountCtr,
  findBindUsersCtr,
  adminFindAuthorInfoCtr,
  adminResetPwdCtr,
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
  adminRemoveArticleCtr,
  adminFindCommentsByIdCtr,
  adminDeleteCommentCtr,
  adminRemoveCommentCtr,
  adminRestoreCommentCtr,
  adminGetArticlesCommentsCtr,
} = adminArticleController;

// 主题设置控制器
const { adminCreateConfigCtr } = adminPageConfigController;

// 留言控制器
const {
  adminGetInteractListCtr,
  adminRemoveInteractsCtr,
  adminRestoreInteractsCtr,
  adminDelInteractsCtr,
} = adminGetInteractController;

// 文章分类控制器
const {
  adminCreateClassifyCtr,
  adminUpdateClassifyCtr,
  adminDelClassifysCtr,
  adminGetClassifyListCtr,
  adminAddClassifyCtr,
} = adminClassifyController;

// 实用工具控制器
const {
  adminAddToolsCtr,
  adminGetToolListCtr,
  adminUpdateToolsCtr,
  adminDeleteToolsCtr,
  adminCreateToolSortCtr,
  adminUpdateToolSortCtr,
  adminGetToolSortCtr,
} = adminToolsController;

// 统计
const {
  adminGetArticlesStatisticsCtr,
  adminGetRegisterStatisticsCtr,
  adminGetAuhthorListCtr,
  adminGetPopularArticlesCtr,
} = adminStatisticsController;

module.exports = {
  // 前台控制器
  registerCtr,
  loginCtr,
  updateInfoCtr,
  resetPwdCtr,
  logoutCtr,
  getUserInfoCtr,
  uploadFileCtr,
  removeFileCtr,
  downLoadFileCtr,

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
  getAddedClassifysCtr,
  getMyArticleListCtr,
  getLikeArticleListCtr,
  getArticleByRandomCtr,
  getAuthorArticleListCtr,
  getAuthorLikeArticlesCtr,
  getAuthorTimelineCtr,
  getPrevArticleCtr,
  getNextArticleCtr,
  advancedSearchCtr,
  getLikenessArticlesCtr,
  checkArticleLikeStatusCtr,
  verifyTokenCtr,
  createDraftCtr,
  updateDraftCtr,
  deleteDraftCtr,
  getDraftListCtr,
  getDraftByIdCtr,
  createCollectionCtr,
  getCollectionListCtr,
  collectArticlesCtr,
  checkCollectionStatusCtr,
  cancelCollectedCtr,
  getCollectedTotalCtr,
  delCollectionCtr,
  updateCollectionCtr,
  getCollectInfoCtr,
  getCollectArticlesCtr,
  removeCollectArticleCtr,
  getCollectTotalCtr,
  getMessageListCtr,
  setReadStatusCtr,
  getNoReadMsgCountCtr,
  deleteMessageCtr,
  deleteAllMessageCtr,
  createInteractCtr,
  getInteractsCtr,
  getInteractListCtr,
  removeInteractsCtr,
  delInteractsCtr,
  manageFollowCtr,
  getFollowListCtr,
  findFollowedCtr,
  addAtlasImagesCtr,
  getAtlasListCtr,
  deleteAtlasImagesCtr,

  // 后台用户控制器
  adminRegisterCtr,
  adminLoginCtr,
  adminGetUserInfoCtr,
  adminUpdateInfoCtr,
  adminVerifyTokenCtr,
  adminGetUserListCtr,
  adminGetAdminUserListCtr,
  adminBatchDeleteUserCtr,
  adminUpdateAdminUsersCtr,
  adminDeleteAdminUsersCtr,
  adminSetAuthCtr,
  adminSetAdminUserAuthCtr,
  adminUpdateUsersCtr,
  bindAccountCtr,
  findBindUsersCtr,
  adminFindAuthorInfoCtr,
  adminResetPwdCtr,
  // 后台文章控制器
  adminCreateArticleCtr,
  adminUpdateArticleCtr,
  adminDeleteArticleCtr,
  adminGetArticleListCtr,
  adminSearchArticleCtr,
  adminGetArticleByIdCtr,
  adminBatchDeleteArticleCtr,
  adminShelvesArticleCtr,
  adminRemoveArticleCtr,
  adminFindCommentsByIdCtr,
  adminDeleteCommentCtr,
  adminRemoveCommentCtr,
  adminRestoreCommentCtr,
  adminGetArticlesCommentsCtr,
  // 主题设置控制器
  adminCreateConfigCtr,
  // 留言
  adminGetInteractListCtr,
  adminRemoveInteractsCtr,
  adminRestoreInteractsCtr,
  adminDelInteractsCtr,
  // 文章分类
  adminCreateClassifyCtr,
  adminUpdateClassifyCtr,
  adminDelClassifysCtr,
  adminGetClassifyListCtr,
  adminAddClassifyCtr,
  // 工具
  adminAddToolsCtr,
  adminGetToolListCtr,
  adminUpdateToolsCtr,
  adminDeleteToolsCtr,
  adminCreateToolSortCtr,
  adminUpdateToolSortCtr,
  adminGetToolSortCtr,
  // 后台统计
  adminGetArticlesStatisticsCtr,
  adminGetRegisterStatisticsCtr,
  adminGetAuhthorListCtr,
  adminGetPopularArticlesCtr,
};
