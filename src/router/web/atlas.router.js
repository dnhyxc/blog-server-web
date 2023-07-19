const Router = require("koa-router");
const {
  addAtlasImagesCtr,
  getAtlasListCtr,
  deleteAtlasImagesCtr,
} = require("../../controller");

const { auth } = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 添加图片集图片
router.post("/addAtlasImages", auth, addAtlasImagesCtr);

// 获取图片集图片
router.post("/getAtlasList", auth, getAtlasListCtr);

// 删除图片集图片
router.post("/deleteAtlasImages", auth, deleteAtlasImagesCtr);

module.exports = router;
