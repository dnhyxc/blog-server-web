const Router = require("koa-router");
const {
  uploadFileCtr,
  removeFileCtr,
  downLoadFileCtr,
} = require("../../controller");
const { auth } = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 上传图片
router.post("/upload", auth, uploadFileCtr);

// 删除图片
router.post("/removeFile", auth, removeFileCtr);

// 文件下载
router.post("/downLoadFile", downLoadFileCtr);

module.exports = router;
