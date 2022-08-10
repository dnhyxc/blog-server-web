const { getMyArticleList, getLikeArticleList } = require("../service");
const { databaseError } = require("../constant");

class userInfoController {
  // 获取我的文章
  async getMyArticleListCtr(ctx, next) {
    const { pageNo, pageSize, userId } = ctx.request.body;
    try {
      // 操作数据库
      const res = await getMyArticleList({ pageNo, pageSize, userId });
      // 返回结果
      ctx.body = {
        code: 200,
        success: true,
        message: "获取分类列表成功",
        data: res,
      };
    } catch (error) {
      console.error("getClassifyListCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 获取点赞的文章
  async getLikeArticleListCtr(ctx, next) {
    const { pageNo, pageSize, userId } = ctx.request.body;
    try {
      // 操作数据库
      const res = await getLikeArticleList({ pageNo, pageSize, userId });
      // 返回结果
      ctx.body = {
        code: 200,
        success: true,
        message: "获取分类列表成功",
        data: res,
      };
    } catch (error) {
      console.error("getClassifyListCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 数据库测试接口
  async testCtr(ctx, next) {
    ctx.body = {
      code: 200,
      success: true,
      message: "获取分类列表成功",
      data: {
        name: "test",
        id: "902209",
      },
    };
  }
}

module.exports = new userInfoController();
