const Router = require("koa-router");
const {
  createCollectionCtr,
  getCollectionListCtr,
  collectArticlesCtr,
  checkCollectionStatusCtr,
  cancelCollectedCtr,
  getCollectedTotalCtr,
  delCollectionCtr,
  updateCollectionCtr,
  getCollectInfoCtr,
} = require("../../controller");

const { auth } = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 创建收藏集
router.post("/createCollection", auth, createCollectionCtr);

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

// 删除收藏集
router.post("/updateCollection", auth, updateCollectionCtr);

// 获取收藏集详情
router.post("/getCollectInfo", auth, getCollectInfoCtr);

module.exports = router;
