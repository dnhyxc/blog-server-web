import { LikeArticle } from "../models";

class likeArticleServer {
  // 创建评论
  async checkLikeArticle(articleId, userId) {
    // 查找
    const find = await LikeArticle.findOne({
      userId: userId,
      articleId,
    });

    // 如果find有值说明点赞过，需要删除，否则就是没点过赞，需要创建，同时点赞数要加一
    if (find) {
      // 创建
      await LikeArticle.deleteOne({
        userId: userId,
        articleId,
      });
      return true;
    } else {
      // 创建
      await LikeArticle.create({
        userId: userId,
        articleId,
      });
      return false;
    }
  }
}

export default new likeArticleServer();
