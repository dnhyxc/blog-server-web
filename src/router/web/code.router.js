const Router = require("koa-router");
const {
  addCodeCtr,
  updateCodeCtr,
  deleteCodeCtr,
  getCodeListCtr,
  getCodeByIdCtr,
  compileCCodeCtr,
  compileJSCodeCtr,
} = require("../../controller");

const { auth } = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 添加代码示例
router.post("/addCode", auth, addCodeCtr);

// 获取代码示例列表
router.post("/getCodeList", auth, getCodeListCtr);

// 删除代码示例
router.post("/deleteCode", auth, deleteCodeCtr);

// 更新代码示例
router.post("/updateCode", auth, updateCodeCtr);

// 获取代码示例
router.post("/getCodeById", auth, getCodeByIdCtr);

// 编译C语言
router.post("/compileCCode", auth, compileCCodeCtr);

// 编译JS
router.post("/compileJSCode", auth, compileJSCodeCtr);

module.exports = router;
