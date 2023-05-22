const Router = require("koa-router");
const {
  getInteractListCtr,
  removeInteractsCtr,
  delInteractsCtr,
} = require("../../controller");

const { adminAuth } = require("../../middleware");

const router = new Router({ prefix: "/admin" });

// 分页获取留言列表
router.post("/getInteractList", adminAuth, getInteractListCtr);

// 移除留言列表
router.post("/removeInteracts", adminAuth, removeInteractsCtr);

// 彻底删除留言列表
router.post("/delInteracts", adminAuth, delInteractsCtr);

module.exports = router;
