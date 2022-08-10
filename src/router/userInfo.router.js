const Router = require("koa-router");
const {
  getMyArticleListCtr,
  getLikeArticleListCtr,
  testCtr,
} = require("../controller");

const router = new Router({ prefix: "/api" });

// 获取我的文章列表
router.post("/getMyArticleList", getMyArticleListCtr);

// 获取我点赞的文章列表
router.post("/getLikeArticleList", getLikeArticleListCtr);

// 服务器测试接口
router.post("/test", testCtr);

module.exports = router;
