// 前台model
const User = require("./web/user.model");
const Article = require("./web/article.model");
const Draft = require("./web/draft.model");
const Comments = require("./web/comments.model");
const Like = require("./web/like.model");
const LikeArticle = require("./web/likeArticle.model");
const Collection = require("./web/collection.model");
const Message = require("./web/message.model");
const Interact = require("./web/interact.model");
const Follow = require("./web/follow.model");
const Atlas = require("./web/atlas.model");

// 后台model
const AdminUsers = require("./admin/user.model");
const PageConfig = require("./admin/config.model");
const Classify = require("./admin/classify.model");
const Tools = require("./admin/tools.model");
const ToolSort = require("./admin/toolSort.model");

module.exports = {
  User,
  Article,
  Draft,
  Comments,
  Like,
  LikeArticle,
  AdminUsers,
  Collection,
  Message,
  Interact,
  Follow,
  Atlas,
  PageConfig,
  Classify,
  Tools,
  ToolSort,
};
