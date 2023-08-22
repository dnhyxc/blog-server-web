const { databaseError } = require("../../constant");
const { adminCreateConfig, adminCreateThemes } = require("../../service");

class PageConfigController {
  async adminCreateConfigCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      await adminCreateConfig(params);
      ctx.body = {
        code: 200,
        message: "主题设置成功",
        success: true,
        data: params.bindUserIds,
      };
    } catch (error) {
      console.error("adminCreateConfigCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 创建主题信息
  async adminCreateThemesCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await adminCreateThemes(params);
      console.log(res, 'res');
      ctx.body = {
        code: 200,
        message: "添加主题成功",
        success: true,
        data: res,
      };
    } catch (error) {
      console.error("adminCreateThemesCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }
}

module.exports = new PageConfigController();
