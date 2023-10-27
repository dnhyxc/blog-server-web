const {
  addContacts,
  deleteContacts,
  toTopContacts,
  getContactList,
} = require("../../service");
const { databaseError } = require("../../constant");

class contactsController {
  // 添加联系人
  async addContactsCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await addContacts(params);
      ctx.body = {
        code: 200,
        success: true,
        message: res ? "添加成功" : "重复添加",
        data: params.userId,
      };
    } catch (error) {
      console.error("addContactsCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 删除联系人
  async deleteContactsCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      await deleteContacts(params);
      ctx.body = {
        code: 200,
        message: "删除成功",
        success: true,
        data: params.userId,
      };
    } catch (error) {
      console.error("deleteContactsCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 联系人置顶
  async toTopContactsCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await toTopContacts(params);
      ctx.body = {
        code: 200,
        success: true,
        message: "置顶成功",
        data: res,
      };
    } catch (error) {
      console.error("toTopContactsCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 获取联系人
  async getContactListCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await getContactList(params);
      ctx.body = {
        code: 200,
        success: true,
        message: "获取成功",
        data: res,
      };
    } catch (error) {
      console.error("getContactListCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }
}

module.exports = new contactsController();