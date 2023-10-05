const Router = require("koa-router");
const {
  getMyArticleListCtr,
  getLikeArticleListCtr,
  getAuthorArticleListCtr,
  getAuthorLikeArticlesCtr,
  getAuthorTimelineCtr,
} = require("../../controller");

const { auth } = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 获取我的文章列表
router.post("/getMyArticleList", auth, getMyArticleListCtr);

// 获取我点赞的文章列表
router.post("/getLikeArticleList", auth, getLikeArticleListCtr);

// 获取博主文章列表
router.post("/getAuthorArticleList", getAuthorArticleListCtr);

// 获取博主点赞的文章列表
router.post("/getAuthorLikeArticles", getAuthorLikeArticlesCtr);

// 获取博主时间轴
router.post("/getAuthorTimeline", getAuthorTimelineCtr);

module.exports = router;
