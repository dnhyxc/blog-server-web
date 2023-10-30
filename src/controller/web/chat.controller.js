const {
  getChatListWithTotal,
  deleteChats,
  mergeChats,
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

  // 合并消息
  async mergeChatsCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      await mergeChats(params);
      ctx.body = {
        code: 200,
        success: true,
      };
    } catch (error) {
      console.error("mergeChatsCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 删除聊天
  async deleteChatsCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await deleteChats(params);
      ctx.body = {
        code: 200,
        success: true,
        message: "删除成功",
        data: res,
      };
    } catch (error) {
      console.error("deleteChatsCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }
}

module.exports = new codesController();
