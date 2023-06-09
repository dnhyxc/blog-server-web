const Router = require("koa-router");
const {
  adminGetArticlesStatisticsCtr,
  adminGetRegisterStatisticsCtr,
} = require("../../controller");

const { adminAuth } = require("../../middleware");

const router = new Router({ prefix: "/admin" });

// 获取文章统计
router.post("/getArticlesStatistics", adminAuth, adminGetArticlesStatisticsCtr);

// 获取当前年用户注册情况统计
router.post("/getRegisterStatistics", adminAuth, adminGetRegisterStatisticsCtr);

module.exports = router;
