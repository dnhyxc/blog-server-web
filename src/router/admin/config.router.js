const Router = require("koa-router");
const { adminCreateConfigCtr } = require("../../controller");

const { adminAuth } = require("../../middleware");

const router = new Router({ prefix: "/admin" });

// 创建文章
router.post("/pageConfig", adminAuth, adminCreateConfigCtr);

module.exports = router;
