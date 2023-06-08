const { databaseError } = require("../../constant");
const { adminGetArticlesStatistics } = require("../../service");

class adminStatisticsController {
  // 创建分类
  async adminGetArticlesStatisticsCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await adminGetArticlesStatistics(params);
      ctx.body = {
        code: 200,
        message: "获取成功",
        success: true,
        data: res,
      };
    } catch (error) {
      console.error("adminGetArticlesStatisticsCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }
}

module.exports = new adminStatisticsController();
