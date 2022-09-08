const Router = require("koa-router");
const {
  createDraftCtr,
  updateDraftCtr,
  deleteDraftCtr,
  getDraftListCtr,
  getDraftByIdCtr,
} = require("../../controller");

const { auth } = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 创建文章
router.post("/createDraft", auth, createDraftCtr);

// 更新文章
router.post("/updateDraft", auth, updateDraftCtr);

// 删除文章
router.post("/deleteDraft", auth, deleteDraftCtr);

// 获取草稿列表
router.post("/getDraftList", getDraftListCtr);

// 获取草稿详情
router.post("/getDraftById", getDraftByIdCtr);

module.exports = router;
