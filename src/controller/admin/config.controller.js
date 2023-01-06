const { databaseError } = require("../../constant");
const { adminCreateConfig } = require("../../service");

class PageConfigController {
  async adminCreateConfigCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await adminCreateConfig(params);

      console.log(res, "res>>>>>>res");

      ctx.body = {
        code: 200,
        message: "主题设置成功",
        success: true,
        data: true,
      };
    } catch (error) {
      console.error("adminCreateConfigCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }
}

module.exports = new PageConfigController();
