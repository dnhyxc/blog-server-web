const { Article, LikeArticle } = require("../models");
const { findUserById } = require("./user.service");

class articleServer {
  // 创建文章
  async createArticle({ ...params }) {
    const userInfo = await findUserById(params.authorId);
    return await Article.create({
      ...params,
      likeCount: 0,
      authorName: userInfo.username,
    });
  }

  // 根据文章id查找文章详情
  async updateArticle({ articleId: _id, ...params }) {
    await Article.updateOne({ _id }, { $set: params });
  }

  // 删除文章
  async deleteArticles({ articleId }) {
    return await Article.updateOne(
      { _id: articleId },
      {
        $set: {
          isDelete: true,
        },
      }
    );
  }

  // 查询用户是否点赞
  async checkLikeStatus(userId) {
    const likes = await LikeArticle.find({ userId });
    const likeFilter = likes.map((i) => i.articleId);
    await Article.updateMany(
      { _id: { $nin: likeFilter } },
      {
        $set: {
          isLike: false,
        },
      }
    );
    await Article.updateMany(
      { _id: { $in: likeFilter } },
      {
        $set: {
          isLike: true,
        },
      }
    );
    return likes;
  }

  // 获取文章列表同时返回文章总条数
  async getArticleListWithTotal({ filterKey, pageNo, pageSize }) {
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
                title: "$title",
                classify: "$classify",
                tag: "$tag",
                coverImage: "$coverImage",
                abstract: "$abstract",
                authorId: "$authorId",
                isLike: "$isLike",
                likeCount: "$likeCount",
                createTime: "$createTime",
              },
            },
            { $sort: { createTime: -1 } },
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
    } else {
      return {
        total: 0,
        list: [],
      };
    }
  }

  // 获取文章列表
  async findArticles({ pageNo = 1, pageSize = 20, filter, userId, tagName }) {
    // 获取文章列表时，需要先根据userId判断文章点赞状态
    await new articleServer().checkLikeStatus(userId);
    let filterKey;
    if (tagName) {
      filterKey = { tag: tagName, isDelete: { $nin: [true] } };
    } else {
      // 不区分大小写
      const reg = (filter && new RegExp(filter, "i")) || "";
      filterKey = {
        $or: [
          { title: { $regex: reg } },
          { tag: { $regex: reg } },
          { classify: { $regex: reg } },
          { authorId: { $regex: reg } },
        ],
        isDelete: { $nin: [true] },
      };
    }
    return await new articleServer().getArticleListWithTotal({
      filterKey,
      pageNo,
      pageSize,
    });
  }

  // 根据文章id查找文章详情
  async findArticleById(id) {
    const article = await Article.findById(id, {
      id: "$_id",
      _id: 0,
      title: 1,
      content: 1,
      classify: 1,
      tag: 1,
      abstract: 1,
      createTime: 1,
      coverImage: 1,
      authorId: 1,
      likeCount: 1,
      isLike: 1,
    });
    const userInfo = article && (await findUserById(article.authorId));
    return {
      ...article._doc,
      authorName: userInfo?.username,
      headUrl: userInfo?.headUrl,
    };
  }

  // 根据文章id查找文章详情
  async likeArticle({ id: _id, likeStatus }) {
    await Article.updateOne(
      { _id },
      {
        $inc: { likeCount: likeStatus ? -1 : 1 },
        $set: {
          isLike: likeStatus ? false : true,
        },
      }
    );
    return likeStatus ? false : true;
  }
}

module.exports = new articleServer();
