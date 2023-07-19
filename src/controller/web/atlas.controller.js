const {
  addAtlasImages,
  getAtlasWithTotal,
  deleteAtlasImages,
} = require("../../service");
const { removeAtlasImage } = require("./upload.controller");
const { databaseError } = require("../../constant");

class atlasController {
  // 添加图片
  async addAtlasImagesCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await addAtlasImages(params);
      // 返回结果
      ctx.body = {
        code: 200,
        success: true,
        message: "添加成功",
        data: res,
      };
    } catch (error) {
      console.error("addAtlasImagesCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 获取图片集列表
  async getAtlasListCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await getAtlasWithTotal(params);
      // 返回结果
      ctx.body = {
        code: 200,
        success: true,
        message: "获取收藏集列表成功",
        data: res,
      };
    } catch (error) {
      console.error("getAtlasListCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 删除图片
  async deleteAtlasImagesCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await deleteAtlasImages(params);
      await removeAtlasImage(params.url);
      ctx.body = {
        code: 200,
        success: true,
        message: "删除成功",
        data: res,
      };
    } catch (error) {
      console.error("deleteAtlasImagesCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }
}

module.exports = new atlasController();
