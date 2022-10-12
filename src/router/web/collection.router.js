const Router = require("koa-router");
const {
  createCollectionCtr,
  getCollectionListCtr,
} = require("../../controller");

const { auth, verifyCollection } = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 创建收藏集
router.post("/createCollection", auth, verifyCollection, createCollectionCtr);

// 获取收藏集列表
router.post("/getCollectionList", auth, getCollectionListCtr);

module.exports = router;
