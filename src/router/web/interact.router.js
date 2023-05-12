const Router = require("koa-router");
const {
  createInteractCtr,
  getInteractsCtr,
  getInteractListCtr,
} = require("../../controller");

const { auth } = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 创建留言
router.post("/createInteract", auth, createInteractCtr);

// 获取留言列表
router.post("/getInteracts", auth, getInteractsCtr);

// 分页获取留言列表
router.post("/getInteractList", auth, getInteractListCtr);

module.exports = router;
