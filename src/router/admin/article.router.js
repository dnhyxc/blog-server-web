const Router = require("koa-router");
const {
  adminCreateArticleCtr,
  adminUpdateArticleCtr,
  adminDeleteArticleCtr,
  adminGetArticleListCtr,
  adminSearchArticleCtr,
  adminGetArticleByIdCtr,
  adminBatchDeleteArticleCtr,
  adminShelvesArticleCtr,
  adminFindCommentsByIdCtr,
  adminDeleteCommentCtr,
  adminRestoreCommentCtr,
} = require("../../controller");

const { auth } = require("../../middleware");

const router = new Router({ prefix: "/admin" });

// 创建文章
router.post("/createArticle", auth, adminCreateArticleCtr);

// 更新文章
router.post("/updateArticle", auth, adminUpdateArticleCtr);

// 删除文章
router.post("/deleteArticle", auth, adminDeleteArticleCtr);

// 获取文章
router.post("/articleList", auth, adminGetArticleListCtr);

// 搜索文章
router.post("/searchArticle", auth, adminSearchArticleCtr);

// 获取文章详情
router.post("/articleDetail", auth, adminGetArticleByIdCtr);

// 删除所有文章
router.post("/batchDelArticle", auth, adminBatchDeleteArticleCtr);

// 上架文章
router.post("/shelvesArticle", auth, adminShelvesArticleCtr);

// 获取文章评论
router.post("/getCommentList", auth, adminFindCommentsByIdCtr);

// 删除文章评论
router.post("/deleteComment", auth, adminDeleteCommentCtr);

// 恢复前台删除的文章评论
router.post("/restoreComment", auth, adminRestoreCommentCtr);

module.exports = router;
