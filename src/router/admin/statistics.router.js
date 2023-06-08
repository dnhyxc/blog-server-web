const Router = require("koa-router");
const { adminGetArticlesStatisticsCtr } = require("../../controller");

const { adminAuth } = require("../../middleware");

const router = new Router({ prefix: "/admin" });

// 获取文章统计
router.post("/getArticlesStatistics", adminAuth, adminGetArticlesStatisticsCtr);

module.exports = router;
