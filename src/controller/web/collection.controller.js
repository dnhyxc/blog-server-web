const {
  createCollection,
  getCollectionList,
  collectArticles,
  checkCollectionStatus,
  cancelCollected,
} = require("../../service");
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
      if (res.modifiedCount) {
        ctx.body = {
          code: 200,
          success: true,
          message: "收藏成功，记得时常温习哦！",
          data: params.articleId,
        };
      }
    } catch (error) {
      console.error("collectArticlesCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 获取文章收藏状态
  async checkCollectionStatusCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await checkCollectionStatus({ ...params });
      ctx.body = {
        code: 200,
        success: true,
        message: "获取收藏状态成功",
        data: {
          collected: res.length ? true : false,
        },
      };
    } catch (error) {
      console.error("collectArticlesCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 获取文章收藏状态
  async cancelCollectedCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      const res = await cancelCollected({ ...params });
      ctx.body = {
        code: 200,
        success: true,
        message: "取消收藏成功",
        data: res.modifiedCount,
      };
    } catch (error) {
      console.error("cancelCollectedCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }
}

module.exports = new collectionController();
