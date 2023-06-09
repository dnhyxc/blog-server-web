const { databaseError } = require("../../constant");
const {
  adminGetArticlesStatistics,
  adminGetRegisterStatistics,
} = require("../../service");

class adminStatisticsController {
  // 文章统计
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

  // 用户统计
  async adminGetRegisterStatisticsCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await adminGetRegisterStatistics(params);
      ctx.body = {
        code: 200,
        message: "获取成功",
        success: true,
        data: res,
      };
    } catch (error) {
      console.error("adminGetRegisterStatisticsCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }
}

module.exports = new adminStatisticsController();
