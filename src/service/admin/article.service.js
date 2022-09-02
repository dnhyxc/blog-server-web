const { Article, Comments } = require("../../models");
const { findUserById } = require("../web/user.service");
const { detailFields } = require("../../constant");

class articleServer {
  // 创建文章
  async adminCreateArticle({ ...params }) {
    const userInfo = await findUserById(params.authorId);
    return await Article.create({
      ...params,
      likeCount: 0,
      replyCount: 0,
      authorName: userInfo.username,
    });
  }

  // 根据文章id更新
  async adminUpdateArticle({ articleId: _id, ...params }) {
    await Article.updateOne({ _id }, { $set: params });
  }

  // 删除文章
  async adminDeleteArticles({ articleId }) {
    return await Article.updateOne(
      { _id: articleId },
      {
        $set: {
          isDelete: true,
        },
      }
    );
  }

  // 获取文章列表同时返回文章总条数
  async adminGetArticleListWithTotal({ filterKey, pageNo, pageSize }) {
    const list = await Article.aggregate([
      { $match: filterKey },
      {
        $facet: {
          total: [{ $count: "count" }],
          data: [
            {
              $project: {
                _id: 0, // 默认情况下_id是包含的，将_id设置为0|false，则选择不包含_id，其他字段也可以这样选择是否显示。
                id: "$_id", // 将_id更名为classify
                title: 1,
                classify: 1,
                tag: 1,
                coverImage: 1,
                abstract: 1,
                authorId: 1,
                isLike: 1,
                likeCount: 1,
                createTime: 1,
                authorName: 1,
                replyCount: 1,
                isDelete: 1,
              },
            },
            { $sort: { createTime: -1, likeCount: -1 } },
            { $skip: (pageNo - 1) * pageSize },
            { $limit: pageSize },
          ],
        },
      },
    ]);
    if (list?.length) {
      const { total, data } = list[0];
      return {
        total: total[0]?.count || 0,
        list: data || [],
      };
    }
    return {
      total: 0,
      list: [],
    };
  }

  // 获取文章列表
  async adminFindArticles({ pageNo = 1, pageSize = 20, filter, tagName }) {
    let filterKey;
    if (tagName) {
      filterKey = { tag: tagName };
    } else {
      // 不区分大小写
      const reg = (filter && new RegExp(filter, "i")) || "";
      filterKey = {
        $or: [
          { title: { $regex: reg } },
          { tag: { $regex: reg } },
          { classify: { $regex: reg } },
          { authorId: { $regex: reg } },
          { authorName: { $regex: reg } },
        ],
      };
    }
    return await new articleServer().adminGetArticleListWithTotal({
      filterKey,
      pageNo,
      pageSize,
    });
  }

  // 根据文章id查找文章详情
  async adminFindArticleById(id) {
    const article = await Article.findById(id, detailFields);
    const userInfo = article && (await findUserById(article.authorId));
    return {
      ...article._doc,
      authorName: userInfo?.username,
      headUrl: userInfo?.headUrl,
    };
  }

  // 获取文章总条数
  async adminGetArticleTotal(filter) {
    const res = Article.find(filter).count();
    return res;
  }

  // 批量删除文章
  async adminBatchDeleteArticle({ articleIds }) {
    const res = await Article.deleteMany({ _id: { $in: articleIds } });
    return res.deletedCount;
  }

  // 重新上架文章
  async adminShelvesArticle({ articleIds }) {
    const res = await Article.updateMany(
      { _id: { $in: articleIds } },
      { $unset: { isDelete: true } }
    );
    return res;
  }

  // 根据文章id查找评论
  async adminFindCommentById(articleId) {
    const comment = await Comments.find({ articleId });
    return comment;
  }
}

module.exports = new articleServer();
