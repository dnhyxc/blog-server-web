const Router = require("koa-router");
const {
  adminCreateArticleCtr,
  adminUpdateArticleCtr,
  adminDeleteArticleCtr,
  adminGetArticleListCtr,
  adminSearchArticleCtr,
  adminGetArticleByIdCtr,
  adminDelAllArticleCtr,
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
router.post("/articleList", adminGetArticleListCtr);

// 搜索文章
router.post("/searchArticle", adminSearchArticleCtr);

// 获取文章详情
router.post("/articleDetail", adminGetArticleByIdCtr);

// 删除所有文章
router.del("/delAllArticle", adminDelAllArticleCtr);

module.exports = router;
