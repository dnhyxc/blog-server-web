const Router = require("koa-router");
const {
  adminAddToolsCtr,
  adminGetToolListCtr,
  adminUpdateToolsCtr,
  adminDeleteToolsCtr,
  adminCreateToolSortCtr,
  adminUpdateToolSortCtr,
  adminGetToolSortCtr,
} = require("../../controller");

const { adminAuth } = require("../../middleware");

const router = new Router({ prefix: "/admin" });

// 添加工具
router.post("/addTools", adminAuth, adminAddToolsCtr);

// 获取工具列表
router.post("/getToolList", adminAuth, adminGetToolListCtr);

// 更新工具
router.post("/updateTools", adminUpdateToolsCtr);

// 删除工具
router.post("/deleteTools", adminAuth, adminDeleteToolsCtr);

// 创建工具排序
router.post("/createToolSort", adminCreateToolSortCtr);

// 更新工具排序
router.post("/updateToolSort", adminAuth, adminUpdateToolSortCtr);

// 获取工具排序
router.post("/getToolSort", adminAuth, adminGetToolSortCtr);

module.exports = router;
