const Router = require("koa-router");
const { adminCreateConfigCtr, adminCreateThemesCtr } = require("../../controller");

const { adminAuth } = require("../../middleware");

const router = new Router({ prefix: "/admin" });

// 创建文章
router.post("/pageConfig", adminAuth, adminCreateConfigCtr);

// 创建文章
router.post("/themes", adminAuth, adminCreateThemesCtr);

module.exports = router;
