const Router = require("koa-router");
const {
  createDraftCtr,
  updateDraftCtr,
  deleteDraftCtr,
  getDraftListCtr,
} = require("../../controller");

const { auth } = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 创建文章
router.post("/createDraft", auth, createDraftCtr);

// 更新文章
router.post("/updateDraft", auth, updateDraftCtr);

// 删除文章
router.post("/deleteDraft", auth, deleteDraftCtr);

// 获取文章
router.post("/getDraftList", getDraftListCtr);

module.exports = router;
