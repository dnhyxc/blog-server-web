const Router = require("koa-router");
const {
  getClassifyListCtr,
  getTagListCtr,
  getTimelineListCtr,
} = require("../controller");

const router = new Router({ prefix: "/api" });

// 获取分类列表
router.post("/getClassifyList", getClassifyListCtr);

// 获取标签列表
router.post("/getTagList", getTagListCtr);

// 获取时间轴列表
router.post("/getTimelineList", getTimelineListCtr);

module.exports = router;
