const Router = require("koa-router");
const {
  uploadFileCtr,
  removeFileCtr,
  uploadLargeFileCtr,
} = require("../../controller");
const { auth } = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 上传图片
router.post("/upload", auth, uploadFileCtr);

// 删除图片
router.post("/removeFile", auth, removeFileCtr);

// 大文件上传
router.post("/uploadLargeFile", auth, uploadLargeFileCtr);

module.exports = router;
