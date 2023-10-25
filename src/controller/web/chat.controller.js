const {
  getChatListWithTotal,
  deleteChat
} = require("../../service");
const { databaseError } = require("../../constant");

class codesController {
  // 获取聊天列表
  async getChatListCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await getChatListWithTotal(params);
      ctx.body = {
        code: 200,
        success: true,
        message: "获取成功",
        data: res,
      };
    } catch (error) {
      console.error("getChatListCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 删除聊天
  async deleteChatCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await deleteChat(params);
      ctx.body = {
        code: 200,
        success: true,
        message: "删除成功",
        data: res,
      };
    } catch (error) {
      console.error("deleteChatCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }
}

module.exports = new codesController();
