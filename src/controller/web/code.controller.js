const {
  addCode,
  updateCode,
  deleteCode,
  getCodeListWithTotal,
  getCodeById,
} = require("../../service");
const { databaseError } = require("../../constant");

class codesController {
  // 添加代码示例
  async addCodeCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await addCode(params);
      ctx.body = {
        code: 200,
        success: true,
        message: "保存成功",
        data: res,
      };
    } catch (error) {
      console.error("addCodeCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 更新代码示例
  async updateCodeCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      await updateCode(params);
      ctx.body = {
        code: 200,
        success: true,
        message: "更新成功",
        data: {
          id: params.id,
        },
      };
    } catch (error) {
      console.error("updateCodeCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 获取图片集列表
  async getCodeListCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await getCodeListWithTotal(params);
      // 返回结果
      ctx.body = {
        code: 200,
        success: true,
        message: "获取代码示例列表成功",
        data: res,
      };
    } catch (error) {
      console.error("getCodeListCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 获取图片集列表
  async getCodeByIdCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await getCodeById(params);
      // 返回结果
      ctx.body = {
        code: 200,
        success: true,
        message: "获取成功",
        data: res,
      };
    } catch (error) {
      console.error("getCodeByIdCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 删除图片
  async deleteCodeCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await deleteCode(params);
      ctx.body = {
        code: 200,
        success: true,
        message: "删除成功",
        data: res,
      };
    } catch (error) {
      console.error("deleteCodeCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }
}

module.exports = new codesController();
