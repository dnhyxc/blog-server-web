const Router = require("koa-router");
const {
  getChatListCtr,
  deleteChatCtr,
  mergeChatsCtr,
} = require("../../controller");

const { auth } = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 获取聊天消息列表
router.post("/getChatList", auth, getChatListCtr);

// 合并消息
router.post("/mergeChats", auth, mergeChatsCtr);

// 删除聊天消息
router.post("/deleteChat", auth, deleteChatCtr);

module.exports = router;
