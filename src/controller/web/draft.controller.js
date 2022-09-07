const {
  createDraft,
  updateDraft,
  deleteDraft,
  findDraftList,
} = require("../../service");
const { databaseError } = require("../../constant");

class ArticleController {
  // 创建文章
  async createDraftCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      // 操作数据库
      const res = await createDraft({ ...params });
      // 返回结果
      ctx.body = {
        code: 200,
        success: true,
        message: "创建草稿成功",
        data: {
          id: res.id,
        },
      };
    } catch (error) {
      console.error("createDraftCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 更新文章
  async updateDraftCtr(ctx, next) {
    try {
      const params = ctx.request.body;
      // 操作数据库
      await updateDraft({ ...params });
      // 返回结果
      ctx.body = {
        code: 200,
        success: true,
        message: "草稿更新成功",
        data: {
          id: params.articleId,
        },
      };
    } catch (error) {
      console.error("updateDraftCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 删除文章
  async deleteDraftCtr(ctx, next) {
    try {
      const { articleId } = ctx.request.body;
      if (!articleId) {
        ctx.app.emit("error", fieldFormateError, ctx);
        return;
      }
      // 操作数据库
      await deleteDraft(articleId);
      // 返回结果
      ctx.body = {
        code: 200,
        success: true,
        message: "删除成功",
        data: articleId,
      };
    } catch (error) {
      console.error("deleteDraftCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 获取草稿列表
  async getDraftListCtr(ctx, next) {
    try {
      const { pageNo, pageSize, userId } = ctx.request.body;
      // 操作数据库
      const res = await findDraftList({
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
      console.error("getDraftListCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }
}

module.exports = new ArticleController();
