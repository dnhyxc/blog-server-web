const Router = require("koa-router");
const {
  getMyArticleListCtr,
  getLikeArticleListCtr,
  getAuthorArticleListCtr,
  getAuthorLikeArticlesCtr,
} = require("../controller");

const router = new Router({ prefix: "/api" });

// 获取我的文章列表
router.post("/getMyArticleList", getMyArticleListCtr);

// 获取我点赞的文章列表
router.post("/getLikeArticleList", getLikeArticleListCtr);

// 获取博主文章列表
router.post("/getAuthorArticleList", getAuthorArticleListCtr);

// 获取博主点赞的文章列表
router.post("/getAuthorLikeArticles", getAuthorLikeArticlesCtr);

module.exports = router;
