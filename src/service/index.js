const {
  findOneUser,
  findUserById,
  createUserServer,
  updateUser,
  logout,
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
  updateAuthorName,
  searchArticles,
  updateCollectCount,
  getLikenessArticles,
  checkArticleLikeStatus,
} = require("./web/article.service");
const {
  createComments,
  findCommentById,
  updateComments,
  giveLike,
  deleteComment,
  updateCommentUserInfo,
} = require("./web/comments.service");
const { createLike } = require("./web/like.service");
const { checkLikeArticle } = require("./web/likeArticle.service");
const {
  getClassifyList,
  getTagList,
  getTimelineList,
  getAddedClassifys,
} = require("./web/classify.service");
const {
  getMyArticleList,
  getLikeArticleList,
} = require("./web/userInfo.service");
const {
  createDraft,
  updateDraft,
  deleteDraft,
  findDraftList,
  findDraftById,
} = require("./web/draft.service");
const {
  createCollection,
  findOneCollection,
  getCollectionList,
  collectArticles,
  checkCollectionStatus,
  cancelCollected,
  getCollectedTotal,
  delCollection,
  updateCollection,
  getCollectArticles,
  removeCollectArticle,
  getCollectTotal,
} = require("./web/collection.service");

const {
  createMessage,
  getMessageList,
  setMessageOfReaded,
  getNoReadMsgCount,
  deleteMessage,
  deleteAllMessage,
} = require("./web/message.service");

const {
  createInteract,
  getInteracts,
  getInteractsWithTotal,
  updateInteracts,
  removeInteracts,
  delInteracts,
  restoreInteracts,
} = require("./web/interact.service");

const {
  manageFollow,
  getFollowListWithTotal,
  updateFollowUserInfo,
  findFollowed,
  getFollowMeListWithTotal,
} = require("./web/follow.service");

const {
  findAtlasImage,
  addAtlasImages,
  getAtlasWithTotal,
  deleteAtlasImages,
  findImageUrls,
  updateFileInfo,
} = require("./web/atlas.service");

const {
  createConvert,
  deleteConvert,
  getConvertList,
} = require("./web/convert.service");

const {
  addCode,
  updateCode,
  deleteCode,
  getCodeListWithTotal,
  getCodeById,
} = require("./web/code.service");

// 后台数据库接口
const {
  adminFindOneUser,
  adminFindUserById,
  adminUpdateUser,
  adminCreateUserServer,
  adminGetUserList,
  adminGetAdminUserList,
  adminBatchDeleteUser,
  adminSetAuth,
  adminSetAdminUserAuth,
  adminUpdateUsers,
  adminDeleteAdminUsers,
  adminUpdateAdminUsers,
  bindAccount,
  findBindUsers,
  findAuthorInfo,
  adminFindMenus,
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
  adminRemoveArticle,
  adminFindCommentById,
  adminDeleteComment,
  adminRemoveComment,
  adminRestoreComment,
  adminGetArticlesComments,
} = require("./admin/article.service");

const {
  adminCreateConfig,
  adminFindTheme,
  adminCreateThemes,
  adminGetThemesWithTotal,
} = require("./admin/config.service");
const {
  adminCreateClassify,
  adminUpdateClassify,
  adminDelClassifys,
  adminGetClassifyList,
  adminAddClassify,
} = require("./admin/classify.service");

const {
  adminAddTools,
  adminGetToolListWithTotal,
  adminUpdateTools,
  adminDeleteTools,
  adminCreateToolSort,
  adminGetToolSort,
  adminUpdateToolSort,
} = require("./admin/tools.service");

const {
  adminGetArticlesStatistics,
  adminGetRegisterStatistics,
  adminGetAuhthorList,
  adminGetPopularArticles,
} = require("./admin/statistics.service");

module.exports = {
  // 前台用户
  findOneUser,
  findUserById,
  updateUser,
  logout,
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
  updateCommentUserInfo,
  deleteArticles,
  likeArticle,
  checkLikeArticle,
  getClassifyList,
  getTagList,
  getTimelineList,
  getAddedClassifys,
  checkLikeStatus,
  getArticleListWithTotal,
  getMyArticleList,
  getLikeArticleList,
  getArticleByRandom,
  getPrevArticle,
  getNextArticle,
  getArticleTotal,
  updateAuthorName,
  createDraft,
  updateDraft,
  deleteDraft,
  findDraftList,
  findDraftById,
  searchArticles,
  updateCollectCount,
  getLikenessArticles,
  checkArticleLikeStatus,
  createCollection,
  findOneCollection,
  getCollectionList,
  collectArticles,
  checkCollectionStatus,
  cancelCollected,
  getCollectedTotal,
  delCollection,
  updateCollection,
  getCollectArticles,
  removeCollectArticle,
  getCollectTotal,
  createMessage,
  getMessageList,
  setMessageOfReaded,
  getNoReadMsgCount,
  deleteMessage,
  deleteAllMessage,
  createInteract,
  getInteracts,
  getInteractsWithTotal,
  updateInteracts,
  removeInteracts,
  delInteracts,
  restoreInteracts,
  manageFollow,
  getFollowListWithTotal,
  getFollowMeListWithTotal,
  updateFollowUserInfo,
  findFollowed,
  findAtlasImage,
  addAtlasImages,
  getAtlasWithTotal,
  deleteAtlasImages,
  findImageUrls,
  updateFileInfo,
  createConvert,
  deleteConvert,
  getConvertList,
  addCode,
  updateCode,
  deleteCode,
  getCodeListWithTotal,
  getCodeById,

  // 后台
  adminFindOneUser,
  adminFindUserById,
  adminCreateUserServer,
  adminUpdateUser,
  adminGetUserList,
  adminGetAdminUserList,
  adminBatchDeleteUser,
  adminSetAuth,
  adminFindMenus,
  adminSetAdminUserAuth,
  adminUpdateUsers,
  adminDeleteAdminUsers,
  adminUpdateAdminUsers,
  bindAccount,
  adminCreateConfig,
  adminFindTheme,
  adminCreateThemes,
  adminGetThemesWithTotal,
  findBindUsers,
  findAuthorInfo,
  // 文章分类
  adminCreateClassify,
  adminUpdateClassify,
  adminDelClassifys,
  adminGetClassifyList,
  adminAddClassify,
  // 后台文章
  adminCreateArticle,
  adminUpdateArticle,
  adminDeleteArticles,
  adminFindArticles,
  adminFindArticleById,
  adminGetArticleTotal,
  adminBatchDeleteArticle,
  adminShelvesArticle,
  adminRemoveArticle,
  adminFindCommentById,
  adminDeleteComment,
  adminRemoveComment,
  adminRestoreComment,
  adminGetArticlesComments,
  // 工具
  adminAddTools,
  adminGetToolListWithTotal,
  adminUpdateTools,
  adminDeleteTools,
  adminCreateToolSort,
  adminGetToolSort,
  adminUpdateToolSort,
  // 后台统计
  adminGetArticlesStatistics,
  adminGetRegisterStatistics,
  adminGetAuhthorList,
  adminGetPopularArticles,
};
