const Router = require("koa-router");
const {
  addAtlasImagesCtr,
  getAtlasListCtr,
  deleteAtlasImagesCtr,
  updateFileInfoCtr,
} = require("../../controller");

const { auth } = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 添加图片集图片
router.post("/addAtlasImages", auth, addAtlasImagesCtr);

// 获取图片集图片
router.post("/getAtlasList", auth, getAtlasListCtr);

// 删除图片集图片
router.post("/deleteAtlasImages", auth, deleteAtlasImagesCtr);

// 更新图片集图片信息
router.post("/updateFileInfo", auth, updateFileInfoCtr);

module.exports = router;
