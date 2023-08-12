const {
  addAtlasImages,
  getAtlasWithTotal,
  deleteAtlasImages,
  findImageUrls,
  updateFileInfo,
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

  // 更新图片信息
  async updateFileInfoCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await updateFileInfo(params);
      ctx.body = {
        code: 200,
        success: true,
        message: "更新成功",
        data: res,
      };
    } catch (error) {
      console.error("updateFileInfoCtr", error);
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
      // 查找对应的图片url
      const data = await findImageUrls(params);
      const urls = data.map((i) => i.url);
      const res = await deleteAtlasImages(params);
      await removeAtlasImage(urls);
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
