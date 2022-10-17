const Router = require("koa-router");
const {
  createCollectionCtr,
  getCollectionListCtr,
  collectArticlesCtr,
  checkCollectionStatusCtr,
  cancelCollectedCtr,
  getCollectedTotalCtr,
  delCollectionCtr,
} = require("../../controller");

const { auth, verifyCollection } = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 创建收藏集
router.post("/createCollection", auth, verifyCollection, createCollectionCtr);

// 获取收藏集列表
router.post("/getCollectionList", auth, getCollectionListCtr);

// 收藏文章
router.post("/collectArticles", auth, collectArticlesCtr);

// 获取文章收藏状态
router.post("/checkCollectionStatus", auth, checkCollectionStatusCtr);

// 取消收藏
router.post("/cancelCollected", auth, cancelCollectedCtr);

// 取消收藏
router.post("/getCollectedTotal", auth, getCollectedTotalCtr);

// 删除收藏集
router.post("/delCollection", auth, delCollectionCtr);

module.exports = router;
