const { createCollection, getCollectionList } = require("../../service");
const { databaseError } = require("../../constant");

class collectionController {
  // 创建文章
  async createCollectionCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      // 操作数据库
      const res = await createCollection({ ...params });

      const data = {
        id: res._id,
        name: res.name,
        desc: res.desc,
        status: res.status,
      };

      // 返回结果
      ctx.body = {
        code: 200,
        success: true,
        message: "新建收藏集成功",
        data,
      };
    } catch (error) {
      console.error("createCollectionCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 获取收藏集列表
  async getCollectionListCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      // 操作数据库
      const res = await getCollectionList({ ...params });
      // 返回结果
      ctx.body = {
        code: 200,
        success: true,
        message: "获取收藏集列表成功",
        data: res,
      };
    } catch (error) {
      console.error("getCollectionListCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }
}

module.exports = new collectionController();
