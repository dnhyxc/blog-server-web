const Router = require("koa-router");
const {
  getChatListCtr,
  deleteChatsCtr,
  mergeChatsCtr,
  getUnReadChatCtr,
} = require("../../controller");

const { auth } = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 获取聊天消息列表
router.post("/getChatList", auth, getChatListCtr);

// 合并消息
router.post("/mergeChats", auth, mergeChatsCtr);

// 删除聊天消息
router.post("/deleteChats", auth, deleteChatsCtr);

// 获取未读聊天消息数量
router.post("/getUnReadChat", auth, getUnReadChatCtr);

module.exports = router;
