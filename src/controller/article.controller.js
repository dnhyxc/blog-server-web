const {
  findArticles,
  createArticle,
  findArticleById,
  deleteArticles,
  likeArticle,
  checkLikeArticle,
  updateArticle,
} = require("../service");
const { databaseError, fieldFormateError } = require("../constant");

class ArticleController {
  // 创建文章
  async createArticleCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      // 操作数据库
      const res = await createArticle({ ...params });
      // 返回结果
      ctx.body = {
        code: 200,
        success: true,
        message: "发布成功",
        data: {
          id: res.id,
        },
      };
    } catch (error) {
      console.error("registerCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 创建文章
  async updateArticleCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      // 操作数据库
      await updateArticle({ ...params });
      // 返回结果
      ctx.body = {
        code: 200,
        success: true,
        message: "文章更新成功",
        data: {
          id: params.articleId,
        },
      };
    } catch (error) {
      console.error("registerCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 删除文章
  async deleteArticleCtr(ctx, next) {
    try {
      const { articleId } = ctx.request.body;
      // 操作数据库
      await deleteArticles({ articleId });
      // 返回结果
      ctx.body = {
        code: 200,
        success: true,
        message: "删除成功",
        data: articleId,
      };
    } catch (error) {
      console.error("getArticleListCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 获取文章列表
  async getArticleListCtr(ctx, next) {
    try {
      const { pageNo, pageSize, filter, userId } = ctx.request.body;
      // 操作数据库
      const res = await findArticles({
        pageNo,
        pageSize,
        userId,
        filter,
      });
      // 返回结果
      if (res) {
        ctx.body = {
          code: 200,
          success: true,
          message: "获取文章列表成功",
          data: res,
        };
      }
    } catch (error) {
      console.error("getArticleListCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 获取文章列表
  async searchArticleCtr(ctx, next) {
    try {
      const { pageNo, pageSize, keyword, userId, tagName } = ctx.request.body;
      const keywordReg = /([*.?+$^(){}|\\/])/;
      if (keyword && keywordReg.test(keyword)) {
        ctx.app.emit("error", fieldFormateError, ctx);
        return;
      }
      // 操作数据库
      const res = await findArticles({
        pageNo,
        pageSize,
        userId,
        filter: keyword,
        tagName,
      });
      // 返回结果
      if (res) {
        ctx.body = {
          code: 200,
          success: true,
          message: "获取文章列表成功",
          data: res,
        };
      }
    } catch (error) {
      console.error("searchArticleCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 根据文章id获取详情
  async getArticleByIdCtr(ctx, next) {
    try {
      const { id } = ctx.request.body;
      const res = await findArticleById(id);
      if (res) {
        const detail = { ...res._doc };
        detail.id = detail._id;
        delete detail._id;
        delete detail.__v;

        ctx.body = {
          code: 200,
          success: true,
          message: "获取文章详情成功",
          data: detail,
        };
      }
    } catch (error) {
      console.error("getArticleByIdCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 文章点赞
  async likeArticleCtr(ctx, next) {
    const { id, userId } = ctx.request.body;
    const likeStatus = await checkLikeArticle(id, userId);
    const res = await likeArticle({ id, likeStatus });
    ctx.body = {
      code: 200,
      success: true,
      message: "为文章点赞成功",
      data: {
        id,
        isLike: res,
      },
    };
  }
}

module.exports = new ArticleController();
