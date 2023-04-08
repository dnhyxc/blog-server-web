const Router = require("koa-router");
const {
  getMessageListCtr,
  setReadStatusCtr,
  getNoReadMsgCountCtr,
  deleteMessageCtr,
  deleteAllMessageCtr,
} = require("../../controller");

const { auth } = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 获取消息列表
router.post("/getMessageList", auth, getMessageListCtr);

// 更改消息阅读状态
router.post("/setReadStatus", auth, setReadStatusCtr);

// 获取未读消息数量
router.post("/getNoReadMsgCount", auth, getNoReadMsgCountCtr);

// 删除消息
router.post("/deleteMessage", auth, deleteMessageCtr);

// 删除全部消息
router.post("/deleteAllMessage", auth, deleteAllMessageCtr);

module.exports = router;
