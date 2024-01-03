const Router = require("koa-router");
const {
  createReadBookRecordsCtr,
  getReadBookRecordsCtr,
  deleteReadBookRecordsCtr,
} = require("../../controller");

const { auth } = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 添加读书记录
router.post("/createReadBookRecords", auth, createReadBookRecordsCtr);

// 获取读书记录
router.post("/getReadBookRecords", auth, getReadBookRecordsCtr);

// 删除读书记录
router.post("/deleteReadBookRecords", auth, deleteReadBookRecordsCtr);

module.exports = router;
