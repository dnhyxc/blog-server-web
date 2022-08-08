import userService from "./user.service";
import articleService from "./article.service";
import commentsService from "./comments.service";
import likeService from "./like.service";
import likeArticleService from "./likeArticle.service";
import classifyService from "./classify.service";
import userInfoServer from "./userInfo.service";

const { findOneUser, findUserById, createUserServer, updateUser } = userService;
const {
  createArticle,
  findArticles,
  findArticleById,
  updateArticle,
  deleteArticles,
  likeArticle,
  checkLikeStatus,
  getArticleListWithTotal,
} = articleService;

const {
  createComments,
  findCommentById,
  updateComments,
  giveLike,
  deleteComment,
} = commentsService;

const { createLike } = likeService;

const { checkLikeArticle } = likeArticleService;

const { getClassifyList, getTagList, getTimelineList } = classifyService;

const { getMyArticleList, getLikeArticleList } = userInfoServer;

export {
  findOneUser,
  findUserById,
  updateUser,
  createUserServer,
  createArticle,
  findArticles,
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
};
