const Router = require("koa-router");
const {
  createCollectionCtr,
} = require("../../controller");

const { auth } = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 创建收藏集
router.post("/createCollection", auth, createCollectionCtr);

module.exports = router;
