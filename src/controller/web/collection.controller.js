const { createCollection, getCollectionList, collectArticles } = require("../../service");
const { databaseError } = require("../../constant");

class collectionController {
  // 创建文章
  async createCollectionCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await createCollection({ ...params });
      const data = {
        id: res._id,
        name: res.name,
        desc: res.desc,
        status: res.status,
      };
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
      const res = await getCollectionList({ ...params });
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

  // 收藏文章
  async collectArticlesCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await collectArticles({ ...params });
      console.log(res, 'res');
      ctx.body = {
        code: 200,
        success: true,
        message: "获取收藏集列表成功",
        data: params.articleId,
      };
    } catch (error) {
      console.error("collectArticlesCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }
}

module.exports = new collectionController();
