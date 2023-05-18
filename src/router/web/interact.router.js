const Router = require("koa-router");
const {
  createInteractCtr,
  getInteractsCtr,
  getInteractListCtr,
  removeInteractsCtr,
  delInteractsCtr,
} = require("../../controller");

const { auth } = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 创建留言
router.post("/createInteract", auth, createInteractCtr);

// 获取留言列表
router.post("/getInteracts", auth, getInteractsCtr);

// 分页获取留言列表
router.post("/getInteractList", auth, getInteractListCtr);

// 移除留言列表
router.post("/removeInteracts", auth, removeInteractsCtr);

// 彻底删除留言列表
router.post("/delInteracts", auth, delInteractsCtr);

module.exports = router;
