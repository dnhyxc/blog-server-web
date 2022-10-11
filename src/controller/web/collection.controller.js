const { createCollection } = require("../../service");
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
        status: res.status
      };

      // 返回结果
      ctx.body = {
        code: 200,
        success: true,
        message: "创建收藏集成功",
        data,
      };
    } catch (error) {
      console.error("createCollectionCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }
}

module.exports = new collectionController();
