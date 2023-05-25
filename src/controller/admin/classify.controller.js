const { databaseError } = require("../../constant");
const {
  adminCreateClassify,
  adminUpdateClassify,
  adminDelClassifys,
  adminGetClassifyList,
} = require("../../service");

class adminClassifyController {
  // 创建分类
  async adminCreateClassifyCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await adminCreateClassify(params);
      console.log(res, "res>>>>>>res");
      ctx.body = {
        code: 200,
        message: "分类创建成功",
        success: true,
        data: res,
      };
    } catch (error) {
      console.error("adminCreateClassifyCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 更新分类
  async adminUpdateClassifyCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await adminUpdateClassify(params);
      console.log(res, "res>>>>更新分类>>res");
      ctx.body = {
        code: 200,
        message: "分类更新成功",
        success: true,
        data: res,
      };
    } catch (error) {
      console.error("adminUpdateClassifyCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 删除分类
  async adminDelClassifysCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await adminDelClassifys(params);
      console.log(res, "res>>>>删除分类>>res");
      ctx.body = {
        code: 200,
        message: "分类删除成功",
        success: true,
        data: res,
      };
    } catch (error) {
      console.error("adminDelClassifysCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 获取分类
  async adminGetClassifyListCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await adminGetClassifyList(params);
      console.log(res, "res>>>>获取分类>>res");
      ctx.body = {
        code: 200,
        message: "分类获取成功",
        success: true,
        data: res,
      };
    } catch (error) {
      console.error("adminGetClassifyListCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }
}

module.exports = new adminClassifyController();
