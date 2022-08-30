const mongoose = require("mongoose");
const { Article, LikeArticle } = require("../../models");
const { findUserById, findOneUser } = require("./user.service");
const { anotherFields, detailFields } = require("../../constant");

class articleServer {
  // 创建文章
  async createArticle({ ...params }) {
    const userInfo = await findUserById(params.authorId);
    return await Article.create({
      ...params,
      likeCount: 0,
      replyCount: 0,
      authorName: userInfo.username,
    });
  }

  // 根据文章id查找文章详情
  async updateArticle({ articleId: _id, ...params }) {
    await Article.updateOne({ _id }, { $set: params });
  }

  // 修改作者名称
  async updateAuthorName(authorId, authorName) {
    await Article.updateMany({ authorId }, { $set: { authorName } });
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

  async getLikeArticles(userId) {
    const likes = await LikeArticle.find({ userId }).sort({ createTime: 1 });
    return likes;
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
          { authorName: { $regex: reg } },
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
    const article = await Article.findById(id, detailFields);
    const userInfo = article && (await findUserById(article.authorId));
    return {
      ...article._doc,
      authorName: userInfo?.username,
      headUrl: userInfo?.headUrl,
    };
  }

  async updateReplyCount({ articleId: _id, type, count }) {
    await Article.updateOne(
      { _id },
      {
        $inc: { replyCount: type === "add" ? 1 : -count },
      }
    );
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

  // 随机获取文章
  async getArticleByRandom(userId) {
    // 获取文章列表时，需要先根据userId判断文章点赞状态
    await new articleServer().checkLikeStatus(userId);
    const res = await Article.aggregate([
      { $match: { isDelete: { $nin: [true] } } },
      { $sample: { size: 5 } },
      {
        $project: anotherFields,
      },
      { $sort: { createTime: -1, likeCount: -1 } },
    ]);
    return res;
  }

  // 清空所有文章
  async delAllArticle() {
    await Article.deleteMany({});
  }

  // 处理上下页参数
  async getParams(id, props) {
    const { classify, userId, tagName, from, selectKey } = props;
    if (from === "classify" && classify) {
      return { _id: id, isDelete: { $nin: [true] }, classify };
    }
    if (from === "tag" && tagName) {
      return { _id: id, isDelete: { $nin: [true] }, tag: tagName };
    }
    if (from === "timeline" && userId) {
      return { _id: id, isDelete: { $nin: [true] }, authorId: userId };
    }
    if (from === "personal" && selectKey === "1" && userId) {
      return { _id: id, isDelete: { $nin: [true] }, authorId: userId };
    }
    if (from === "personal" && selectKey === "2" && userId) {
      // 返回文章列表前，首先根据userId检测点赞状态
      const likes = await await new articleServer().getLikeArticles(userId);
      const articleIds = likes.map(
        (i) => new mongoose.Types.ObjectId(i.articleId)
      );
      return {
        _id: { $in: articleIds, ...id },
        isDelete: { $nin: [true] },
      };
    }
    if (from === "author" && selectKey === "1") {
      // 查询 auth 为1 的博主信息
      const authorInfo = await findOneUser({ auth: 1 });
      return {
        _id: id,
        isDelete: { $nin: [true] },
        authorId: authorInfo?._id?.toString(),
      };
    }
    if (from === "author" && selectKey === "2") {
      // 查询 auth 为1 的博主信息
      const authorInfo = await findOneUser({ auth: 1 });
      const userId = authorInfo?._id?.toString();
      const likes = await await new articleServer().getLikeArticles(userId);
      const articleIds = likes.map(
        (i) => new mongoose.Types.ObjectId(i.articleId)
      );
      return {
        _id: { $in: articleIds, ...id },
        isDelete: { $nin: [true] },
      };
    }
    if (from === "author" && selectKey === "3") {
      const authorInfo = await findOneUser({ auth: 1 });
      const userId = authorInfo?._id?.toString();
      return { _id: id, isDelete: { $nin: [true] }, authorId: userId };
    }
    return { _id: id, isDelete: { $nin: [true] } };
  }

  // 获取上一篇文章
  async getPrevArticle(id, props) {
    const filter = await new articleServer().getParams({ $gt: id }, props);
    const res = Article.findOne(filter, anotherFields)
      // 获取上一篇需要注意排序，需要将createTime设置为正序排列
      .sort({ _id: 1, createTime: 1 })
      .limit(1);

    return res;
  }

  // 获取下一篇文章
  async getNextArticle(id, props) {
    const filter = await new articleServer().getParams({ $lt: id }, props);
    const res = Article.findOne(filter, anotherFields)
      // 获取上一篇需要注意排序，需要将createTime设置为倒叙序排列
      .sort({ _id: -1, createTime: -1 })
      .limit(1);

    return res;
  }

  // 获取文章总条数
  async getArticleTotal(filter) {
    const res = Article.find(filter).count();
    return res;
  }
}

module.exports = new articleServer();
