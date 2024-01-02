const Router = require("koa-router");
const {
  addBookCtr,
  updateBookInfoCtr,
  getBookListCtr,
  deleteBookCtr,
} = require("../../controller");

const { auth } = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 添加书籍图片
router.post("/addBook", auth, addBookCtr);

// 获取书籍
router.post("/getBookList", auth, getBookListCtr);

// 删除书籍图片
router.post("/deleteBook", auth, deleteBookCtr);

// 更新书籍信息
router.post("/updateBookInfo", auth, updateBookInfoCtr);

module.exports = router;
