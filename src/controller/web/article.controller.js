const {
  findArticles,
  createArticle,
  findArticleById,
  deleteArticles,
  likeArticle,
  checkLikeArticle,
  updateArticle,
  getArticleByRandom,
  delAllArticle,
  getPrevArticle,
  getNextArticle,
  searchArticles,
} = require("../../service");
const {
  databaseError,
  ArticleNotFind,
  fieldFormateError,
} = require("../../constant");

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
      console.error("createArticleCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 更新文章
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
      console.error("updateArticleCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 删除文章
  async deleteArticleCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      if (!params.articleId) {
        ctx.app.emit("error", fieldFormateError, ctx);
        return;
      }
      // 操作数据库
      const res = await deleteArticles(params);
      // 返回结果
      ctx.body = {
        code: 200,
        success: true,
        message: "删除成功",
        data: res,
      };
    } catch (error) {
      console.error("deleteArticleCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 获取文章列表
  async getArticleListCtr(ctx, next) {
    try {
      const { pageNo, pageSize, userId } = ctx.request.body;
      // 操作数据库
      const res = await findArticles({
        pageNo,
        pageSize,
        userId,
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

  // 搜索文章列表
  async searchArticleCtr(ctx, next) {
    try {
      const { pageNo, pageSize, keyword, userId, tagName } = ctx.request.body;
      const keywordReg = /([*.?+$^(){}|\\/])/;
      if (keyword && keywordReg.test(keyword)) {
        ctx.app.emit("error", fieldFormateError, ctx);
        return;
      }
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

  // 高级搜索
  async advancedSearchCtr(ctx, next) {
    try {
      const { pageNo, pageSize, keyword, userId, filterList } =
        ctx.request.body;

      if (!keyword) {
        ctx.app.emit("error", fieldFormateError, ctx);
        return;
      }

      const res = await searchArticles({
        pageNo,
        pageSize,
        userId,
        keyword,
        filterList,
      });

      // 返回结果
      if (res) {
        ctx.body = {
          code: 200,
          success: true,
          message: "搜索文章列表成功",
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
      if (!res) {
        ctx.app.emit("error", ArticleNotFind, ctx);
        return;
      }
      if (res) {
        ctx.body = {
          code: 200,
          success: true,
          message: "获取文章详情成功",
          data: res,
        };
      }
    } catch (error) {
      console.error("getArticleByIdCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 文章点赞
  async likeArticleCtr(ctx, next) {
    try {
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
    } catch (error) {
      console.error("likeArticleCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 随机获取文章
  async getArticleByRandomCtr(ctx, next) {
    try {
      const { userId } = ctx.request.body;
      const res = await getArticleByRandom(userId);
      ctx.body = {
        code: 200,
        success: true,
        message: "获取推荐文章成功",
        data: res,
      };
    } catch (error) {
      console.error("getArticleByRandomCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 清空数据库文章
  async delAllArticleCtr(ctx, next) {
    try {
      await delAllArticle();
      ctx.body = {
        code: 200,
        success: true,
        message: "清空成功",
        data: [],
      };
    } catch (error) {
      console.error("delAllArticleCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 获取上一篇文章
  async getPrevArticleCtr(ctx, next) {
    try {
      const { id, ...props } = ctx.request.body;
      const res = await getPrevArticle(id, props);
      ctx.body = {
        code: 200,
        success: true,
        message: "获取上一篇文章成功",
        data: res || {},
      };
    } catch (error) {
      console.error("getPrevArticleCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 获取下一篇文章
  async getNextArticleCtr(ctx, next) {
    try {
      const { id, ...props } = ctx.request.body;
      const res = await getNextArticle(id, props);
      ctx.body = {
        code: 200,
        success: true,
        message: "获取下一篇文章成功",
        data: res || {},
      };
    } catch (error) {
      console.error("getNextArticleCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }
}

module.exports = new ArticleController();
