const {
  addBook,
  findBook,
  getBooksWithTotal,
  updateBookInfo,
  findBookUrl,
  deleteBook,
} = require("../../service");
const { removeFileCtr } = require("./upload.controller");
const { databaseError } = require("../../constant");

class booksController {
  // 添加书籍
  async addBookCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const findOne = await findBook(params);
      if (findOne) {
        ctx.body = {
          code: 201,
          success: true,
          message: "该书籍已存在",
          data: findOne,
        };
      } else {
        const res = await addBook(params);
        ctx.body = {
          code: 200,
          success: true,
          message: "添加成功",
          data: res,
        };
      }
    } catch (error) {
      console.error("addBookCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 更新书籍信息
  async updateBookInfoCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await updateBookInfo(params);
      ctx.body = {
        code: 200,
        success: true,
        message: "更新成功",
        data: res,
      };
    } catch (error) {
      console.error("updateBookCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 获取书籍列表
  async getBookListCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await getBooksWithTotal(params);
      ctx.body = {
        code: 200,
        success: true,
        message: "获取书籍列表成功",
        data: res,
      };
    } catch (error) {
      console.error("getBookListCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 删除书籍
  async deleteBookCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      // 查找对应的书籍url
      const book = await findBookUrl(params);
      const res = await deleteBook(params);
      await removeFileCtr(book.url);
      ctx.body = {
        code: 200,
        success: true,
        message: "删除成功",
        data: res,
      };
    } catch (error) {
      console.error("deleteBookCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }
}

module.exports = new booksController();
