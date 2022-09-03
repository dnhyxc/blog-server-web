const {
  adminCreateArticle,
  adminUpdateArticle,
  adminDeleteArticles,
  adminFindArticles,
  adminFindArticleById,
  adminBatchDeleteArticle,
  adminShelvesArticle,
  adminFindCommentById,
  adminDeleteComment,
} = require("../../service");
const { databaseError, fieldFormateError } = require("../../constant");

class ArticleController {
  // 创建文章
  async adminCreateArticleCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      // 操作数据库
      const res = await adminCreateArticle({ ...params });
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
  async adminUpdateArticleCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      // 操作数据库
      await adminUpdateArticle({ ...params });
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
      console.error("adminUpdateArticleCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 删除文章
  async adminDeleteArticleCtr(ctx, next) {
    try {
      const { articleId } = ctx.request.body;
      if (!articleId) {
        ctx.app.emit("error", fieldFormateError, ctx);
        return;
      }
      // 操作数据库
      await adminDeleteArticles({ articleId });
      // 返回结果
      ctx.body = {
        code: 200,
        success: true,
        message: "删除成功",
        data: articleId,
      };
    } catch (error) {
      console.error("adminDeleteArticleCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 获取文章列表
  async adminGetArticleListCtr(ctx, next) {
    try {
      const { pageNo, pageSize, filter, userId } = ctx.request.body;
      // 操作数据库
      const res = await adminFindArticles({
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
      console.error("adminGetArticleListCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 搜索文章列表
  async adminSearchArticleCtr(ctx, next) {
    try {
      const { pageNo, pageSize, keyword, userId, tagName } = ctx.request.body;
      const keywordReg = /([*.?+$^(){}|\\/])/;
      if (keyword && keywordReg.test(keyword)) {
        ctx.app.emit("error", fieldFormateError, ctx);
        return;
      }
      const res = await adminFindArticles({
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
      console.error("adminSearchArticleCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 根据文章id获取详情
  async adminGetArticleByIdCtr(ctx, next) {
    try {
      const { id } = ctx.request.body;
      const res = await adminFindArticleById(id);
      if (res) {
        ctx.body = {
          code: 200,
          success: true,
          message: "获取文章详情成功",
          data: res,
        };
      }
    } catch (error) {
      console.error("adminGetArticleByIdCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 批量删除
  async adminBatchDeleteArticleCtr(ctx, next) {
    try {
      const { articleIds } = ctx.request.body;
      const res = await adminBatchDeleteArticle({ articleIds });
      ctx.body = {
        code: 200,
        success: true,
        message: "删除成功",
        data: res,
      };
    } catch (error) {
      console.error("adminBatchDeleteArticleCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 文章上架
  async adminShelvesArticleCtr(ctx, next) {
    try {
      const { articleIds } = ctx.request.body;
      const res = await adminShelvesArticle({ articleIds });
      ctx.body = {
        code: 200,
        success: true,
        message: "删除成功",
        data: res.modifiedCount,
      };
    } catch (error) {
      console.error("adminBatchDeleteArticleCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 根据文章id查找对应的评论
  async adminFindCommentsByIdCtr(ctx, next) {
    try {
      const { id } = ctx.request.body;
      // 操作数据库
      const res = await adminFindCommentById(id);
      if (res) {
        const comments = res.map((i) => {
          const comment = { ...i._doc };
          comment.commentId = comment._id;
          delete comment._id;
          delete comment.__v;
          const newList = comment.replyList.map((j) => {
            const item = { ...j._doc };
            item.commentId = j._id;
            delete item._id;
            delete item.__v;
            return item;
          });
          comment.replyList = newList;
          return comment;
        });

        // 返回结果
        ctx.body = {
          code: 200,
          success: true,
          message: "获取评论成功",
          data: comments,
        };
      }
    } catch (error) {
      console.error("findCommentsById", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 删除评论
  async adminDeleteCommentCtr(ctx, next) {
    try {
      const { commentId, fromCommentId, articleId } = ctx.request.body;
      // 判断当前用户是否对当前评论点过赞
      const res = await adminDeleteComment(commentId, fromCommentId, articleId);
      ctx.body = {
        code: 200,
        success: true,
        message: "删除成功",
        data: commentId,
      };
    } catch (error) {
      console.error("adminDeleteCommentCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }
}

module.exports = new ArticleController();