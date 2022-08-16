const Router = require("koa-router");
const {
  getMyArticleListCtr,
  getLikeArticleListCtr,
} = require("../controller");

const router = new Router({ prefix: "/api" });

// 获取我的文章列表
router.post("/getMyArticleList", getMyArticleListCtr);

// 获取我点赞的文章列表
router.post("/getLikeArticleList", getLikeArticleListCtr);

module.exports = router;
