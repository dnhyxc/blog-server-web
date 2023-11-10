const Router = require("koa-router");
const {
  addContactsCtr,
  deleteContactsCtr,
  onUpdateContactCtr,
  getContactListCtr,
  searchContactsCtr,
  onUpdateCatchContactCtr,
  mergeContactsCtr,
  getCatchContactListCtr,
  deleteCatchContactsCtr,
} = require("../../controller");

const { auth } = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 添加联系人
router.post("/addContacts", auth, addContactsCtr);

// 更新联系人
router.post("/updateContact", auth, onUpdateContactCtr);

// 更新缓存联系人
router.post("/onUpdateCatchContact", auth, onUpdateCatchContactCtr);

// 合并联系人
router.post("/mergeContacts", auth, mergeContactsCtr);

// 删除联系人
router.post("/deleteContacts", auth, deleteContactsCtr);

// 获取联系人
router.post("/getContactList", auth, getContactListCtr);

// 获取缓存联系人
router.post("/getCatchContactList", auth, getCatchContactListCtr);

// 搜索联系人
router.post("/searchContacts", auth, searchContactsCtr);

// 搜索缓存联系人
router.post("/deleteCatchContacts", auth, deleteCatchContactsCtr);

module.exports = router;
