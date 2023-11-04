const Router = require("koa-router");
const {
  addContactsCtr,
  deleteContactsCtr,
  onUpdateContactCtr,
  getContactListCtr,
  searchContactsCtr,
} = require("../../controller");

const { auth } = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 添加联系人
router.post("/addContacts", auth, addContactsCtr);

// 更新联系人
router.post("/updateContact", auth, onUpdateContactCtr);

// 删除联系人
router.post("/deleteContacts", auth, deleteContactsCtr);

// 获取联系人
router.post("/getContactList", auth, getContactListCtr);

// 搜索联系人
router.post("/searchContacts", auth, searchContactsCtr);

module.exports = router;
