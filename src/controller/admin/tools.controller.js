const { databaseError } = require("../../constant");
const {
  adminAddTools,
  adminGetToolListWithTotal,
  adminUpdateTools,
  adminDeleteTools,
} = require("../../service");

class ToolsController {
  // 添加工具
  async adminAddToolsCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await adminAddTools(params);
      ctx.body = {
        code: 200,
        message: "添加工具成功",
        success: true,
        data: res.id,
      };
    } catch (error) {
      console.error("adminAddToolsCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 获取工具列表
  async adminGetToolListCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await adminGetToolListWithTotal(params);
      ctx.body = {
        code: 200,
        message: "获取工具列表成功",
        success: true,
        data: res,
      };
    } catch (error) {
      console.error("adminGetToolListCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 更新工具
  async adminUpdateToolsCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await adminUpdateTools(params);
      ctx.body = {
        code: 200,
        message: "更新成功",
        success: true,
        data: res,
      };
    } catch (error) {
      console.error("adminUpdateToolsCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 删除工具
  async adminDeleteToolsCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await adminDeleteTools(params);
      ctx.body = {
        code: 200,
        message: "删除成功",
        success: true,
        data: res,
      };
    } catch (error) {
      console.error("adminDeleteToolsCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }
}

module.exports = new ToolsController();
