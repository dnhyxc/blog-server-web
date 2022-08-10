const Router = require("koa-router");
const {
  createCommentsCtr,
  findCommentsById,
  giveLikeCtr,
  deleteCommentCtr,
} = require("../controller");
const { auth } = require("../middleware");

const router = new Router({ prefix: "/api" });

// 创建评论
router.post("/comments", auth, createCommentsCtr);
// 获取评论
router.post("/getCommentList", findCommentsById);
// 点赞
router.post("/giveLike", auth, giveLikeCtr);
// 删除评论
router.post("/deleteComment", auth, deleteCommentCtr);

module.exports = router;
