const Router = require("koa-router");
const {
  getArticleListCtr,
  createArticleCtr,
  getArticleByIdCtr,
  deleteArticleCtr,
  likeArticleCtr,
  updateArticleCtr,
  searchArticleCtr,
  getArticleByRandomCtr,
  delAllArticleCtr,
} = require("../controller");

const { auth } = require("../middleware");

const router = new Router({ prefix: "/api" });

// 创建文章
router.post("/createArticle", auth, createArticleCtr);

// 更新文章
router.post("/updateArticle", auth, updateArticleCtr);

// 删除文章
router.post("/deleteArticle", auth, deleteArticleCtr);

// 文章点赞
router.post("/likeArticle", auth, likeArticleCtr);

// 获取文章
router.post("/articleList", getArticleListCtr);

// 搜索文章
router.post("/searchArticle", searchArticleCtr);

// 获取文章详情
router.post("/articleDetail", getArticleByIdCtr);

// 随机获取文章
router.post("/getArticleByRandom", getArticleByRandomCtr);

// 删除所有文章
router.del("/delAllArticle", delAllArticleCtr);

module.exports = router;
