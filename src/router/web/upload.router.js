const Router = require("koa-router");
const { uploadFileCtr } = require("../../controller/web");
const { auth } = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 创建文章
router.post("/upload", auth, uploadFileCtr);

module.exports = router;
