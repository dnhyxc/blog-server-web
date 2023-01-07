const { databaseError } = require("../../constant");
const { adminCreateConfig } = require("../../service");

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
}

module.exports = new PageConfigController();
