const Router = require("koa-router");
const {
  getChatListCtr,
  deleteChatsCtr,
  getCacheChatsCtr,
  mergeChatsCtr,
  getUnReadChatCtr,
  updateNewChatCtr,
  deleteNewChatCtr,
  deleteCatchChatCtr,
  deleteChatMesaageCtr,
} = require("../../controller");

const { auth } = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 获取聊天消息列表
router.post("/getChatList", auth, getChatListCtr);

// 合并消息
router.post("/mergeChats", auth, mergeChatsCtr);

// 获取缓存消息
router.post("/getCacheChats", auth, getCacheChatsCtr);

// 删除聊天消息
router.post("/deleteChats", auth, deleteChatsCtr);

// 删除联系人时，清空聊天消息
router.post("/deleteChatMesaage", auth, deleteChatMesaageCtr);

// 获取未读聊天消息数量
router.post("/getUnReadChat", auth, getUnReadChatCtr);

// 更新最新消息
router.post("/updateNewChat", auth, updateNewChatCtr);

// 删除最新消息
router.post("/deleteNewChat", auth, deleteNewChatCtr);

// 删除缓存消息
router.post("/deleteCatchChat", auth, deleteCatchChatCtr);

module.exports = router;
