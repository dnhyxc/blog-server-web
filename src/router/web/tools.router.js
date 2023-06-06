const Router = require("koa-router");
const { adminGetToolListCtr } = require("../../controller");

const { auth } = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 获取工具列表
router.post("/getToolList", auth, adminGetToolListCtr);

module.exports = router;
