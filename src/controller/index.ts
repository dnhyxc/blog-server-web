import userController from "./user.controller";
import articleController from "./article.controller";
import uploadController from "./upload.controller";
import commentsController from "./comments.controller";
import classifyController from "./classify.controller";
import userInfoController from "./userInfo.controller";

const { registerCtr, loginCtr, updateInfoCtr, getUserInfoCtr } = userController;

const {
  createArticleCtr,
  getArticleListCtr,
  getArticleByIdCtr,
  deleteArticleCtr,
  likeArticleCtr,
  updateArticleCtr,
  searchArticleCtr,
} = articleController;

const { uploadFileCtr } = uploadController;

const { createCommentsCtr, findCommentsById, giveLikeCtr, deleteCommentCtr } =
  commentsController;

const { getClassifyListCtr, getTagListCtr, getTimelineListCtr } =
  classifyController;

const { getMyArticleListCtr, getLikeArticleListCtr } = userInfoController;

export {
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
};
