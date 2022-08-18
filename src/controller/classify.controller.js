const {
  getClassifyList,
  getTagList,
  getTimelineList,
  checkLikeStatus,
} = require("../service");
const { databaseError, userFormateError } = require("../constant");

class classifyController {
  // 创建文章
  async getClassifyListCtr(ctx, next) {
    const { pageNo, pageSize, classify, userId } = ctx.request.body;
    if (!classify) {
      return ctx.app.emit("error", userFormateError, ctx);
    }
    try {
      // 操作数据库
      const res = await getClassifyList({ pageNo, pageSize, classify, userId });
      // 返回结果
      ctx.body = {
        code: 200,
        success: true,
        message: "获取分类列表成功",
        data: res,
      };
    } catch (error) {
      console.error("getClassifyListCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }
  // 获取文章标签列表
  async getTagListCtr(ctx, next) {
    const { pageNo, pageSize } = ctx.request.body;
    try {
      // 操作数据库
      const res = await getTagList({ pageNo, pageSize });
      // 返回结果
      ctx.body = {
        code: 200,
        success: true,
        message: "获取标签列表成功",
        data: res,
      };
    } catch (error) {
      console.error("getTagListCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }
  // 获取文章时间轴
  async getTimelineListCtr(ctx, next) {
    try {
      const { pageNo, pageSize, userId } = ctx.request.body;
      await checkLikeStatus(userId);
      // 操作数据库
      const res = await getTimelineList({ pageNo, pageSize, userId });
      // 返回结果
      ctx.body = {
        code: 200,
        success: true,
        message: "获取时间轴列表成功",
        data: res,
      };
    } catch (error) {
      console.error("getTimelineListCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }
}

module.exports = new classifyController();
