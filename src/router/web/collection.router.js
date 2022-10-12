const Router = require("koa-router");
const {
  createCollectionCtr,
  getCollectionListCtr,
  collectArticlesCtr,
} = require("../../controller");

const { auth, verifyCollection } = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 创建收藏集
router.post("/createCollection", auth, verifyCollection, createCollectionCtr);

// 获取收藏集列表
router.post("/getCollectionList", auth, getCollectionListCtr);

// 收藏文章
router.post("/collectArticles", auth, collectArticlesCtr);

module.exports = router;
