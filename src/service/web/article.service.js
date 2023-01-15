const mongoose = require("mongoose");
const { Article, LikeArticle } = require("../../models");
const { findUserById, findOneUser } = require("./user.service");
const { anotherFields, detailFields } = require("../../constant");
const { getAdvancedSearchFilter, getSortType } = require("../../utils");

class articleServer {
  // 创建文章
  async createArticle({ ...params }) {
    const userInfo = await findUserById(params.authorId);
    return await Article.create({
      ...params,
      likeCount: 0,
      replyCount: 0,
      readCount: 0,
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
  deleteArticles = async ({
    articleId,
    pageNo,
    pageSize,
    type,
    userId,
    tagName, // 表示标签页查询条件
    keyword, // 首页输入的内容
    classify, // 分类页面删除时选中的分类
    accessUserId, // 访问别人的主页时，需要使用accessUserId去检查点赞状态
    delType, // delType 为 '2' 时，说明删除的点赞文章
    authorPage, // 表示博主主页
    authorLike, // 表示博主主页点赞列表
    filterList, // 高级搜索条件
  }) => {
    // home 页面获取下一页第一条数据筛选条件
    const filters = {
      pageNo: pageNo + 1,
      pageSize,
      sortType: { createTime: -1 },
      userId,
      tagName,
      filter: keyword,
    };

    let filterKey = {};

    if (accessUserId) {
      await this.checkLikeStatus(accessUserId);
      filterKey = {
        $and: [{ isDelete: { $nin: [true] }, authorId: userId }],
      };
    }

    if (classify) {
      await this.checkLikeStatus(userId);
      filterKey = { $and: [{ isDelete: { $nin: [true] }, classify }] };
    }

    // 我的主页详情
    if (delType) {
      await this.checkLikeStatus(accessUserId || userId);
      // 返回文章列表前，首先根据userId检测点赞状态
      const likes = await this.getLikeArticles(userId);
      const articleIds = likes.map((i) => {
        return new mongoose.Types.ObjectId(i.articleId);
      });
      filterKey = {
        $and: [{ isDelete: { $nin: [true] }, _id: { $in: articleIds } }],
      };
    }

    // 博主主页，博主文章
    if (authorPage) {
      await this.checkLikeStatus(accessUserId || userId);
      // 查询 auth 为1 的博主信息
      const authorInfo = await findOneUser({ auth: 1 });
      filterKey = {
        $and: [
          { isDelete: { $nin: [true] }, authorId: authorInfo?._id?.toString() },
        ],
      };
    }

    // 博主主页，博主点赞
    if (authorLike) {
      await this.checkLikeStatus(accessUserId || userId);
      const authorInfo = await findOneUser({ auth: 1 });

      const likes = await this.getLikeArticles(authorInfo?._id?.toString());
      const articleIds = likes.map((i) => {
        return new mongoose.Types.ObjectId(i.articleId);
      });

      filterKey = {
        $and: [
          {
            isDelete: { $nin: [true] },
            _id: { $in: articleIds },
          },
        ],
      };
    }

    // 高级搜索
    if (filterList) {
      // 获取文章列表时，需要先根据userId判断文章点赞状态
      await this.checkLikeStatus(userId);
      filterKey = getAdvancedSearchFilter({ filterList, keyword });
    }

    const sortType = filterList ? getSortType(filterList) : { createTime: -1 };

    // 有type,代表是时间轴页面调的删除接口，时间没有分页，不需要获取下一页第一条数据
    let nextPageOne;
    if (!type) {
      if (classify || accessUserId || authorPage || authorLike) {
        // 返回文章列表前，首先根据userId检测点赞状态
        const res = await this.getArticleListWithTotal({
          filterKey,
          pageNo: pageNo + 1,
          pageSize,
          sortType,
        });

        if (filterList?.includes("isLike")) {
          const likes = await this.getLikeArticles(userId);
          const articleIds = likes.map((i) => i.articleId);
          const list = res?.list.filter((i) =>
            articleIds.includes(i.id.toString())
          );
          nextPageOne = {
            total: list.length,
            list: list,
          };
        } else {
          nextPageOne = res;
        }
      } else {
        nextPageOne = await this.findArticles(filters);
      }
    } else {
      nextPageOne = { total: 0, list: [] };
    }

    await Article.updateOne(
      { _id: articleId },
      {
        $set: {
          isDelete: true,
        },
      }
    );

    return nextPageOne;
  };

  getLikeArticles = async (userId) => {
    const likes = await LikeArticle.find({ userId }).sort({ createTime: 1 });
    return likes;
  };

  // 查询用户是否点赞
  checkLikeStatus = async (userId) => {
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
  };

  // 获取文章列表同时返回文章总条数
  getArticleListWithTotal = async ({
    filterKey,
    pageNo,
    pageSize,
    sortType = {},
  }) => {
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
                readCount: 1,
              },
            },
            {
              $sort: Object.keys(sortType).length
                ? sortType
                : { createTime: -1, likeCount: -1 },
            },
            { $skip: (pageNo - 1) * pageSize },
            { $limit: !Object.keys(sortType).length ? pageSize : 1 },
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
  };

  // 获取文章列表
  findArticles = async ({
    pageNo = 1,
    pageSize = 20,
    filter,
    userId,
    tagName,
    sortType,
  }) => {
    // 获取文章列表时，需要先根据userId判断文章点赞状态
    await this.checkLikeStatus(userId);
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
    return await this.getArticleListWithTotal({
      filterKey,
      pageNo,
      pageSize,
      sortType,
    });
  };

  // 计算文章阅读数
  computeArticleReadCount = async (id) => {
    await Article.updateOne(
      { _id: id },
      {
        $inc: {
          readCount: 1,
        },
      }
    );
  };

  // 根据文章id查找文章详情
  findArticleById = async (id) => {
    await this.computeArticleReadCount(id);
    const article = await Article.findById(id, detailFields);
    if (article) {
      const userInfo = article && (await findUserById(article.authorId));
      return {
        ...article._doc,
        authorName: userInfo?.username,
        headUrl: userInfo?.headUrl,
      };
    } else {
      return null;
    }
  };

  // 更新文章评论数
  async updateReplyCount({ articleId: _id, type, count }) {
    await Article.updateOne(
      { _id },
      {
        $inc: { replyCount: type === "add" ? count || 1 : -count },
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
  getArticleByRandom = async (userId) => {
    // 获取文章列表时，需要先根据userId判断文章点赞状态
    await this.checkLikeStatus(userId);
    const res = await Article.aggregate([
      {
        $match: {
          isDelete: { $nin: [true] },
          // 匹配点赞大于等一1或者评论大于等于1的数据
          $or: [{ likeCount: { $gte: 1 } }, { replyCount: { $gte: 1 } }],
        },
      },
      // 随机获取5条数据
      { $sample: { size: 5 } },
      {
        $project: anotherFields,
      },
      { $sort: { createTime: -1 } },
    ]);
    return res;
  };

  // 清空所有文章
  async delAllArticle() {
    await Article.deleteMany({});
  }

  // 处理上下页参数
  getParams = async (id, props) => {
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
      const likes = await this.getLikeArticles(userId);
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
      const likes = await this.getLikeArticles(userId);
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
  };

  // 获取上一篇文章
  getPrevArticle = async (id, props) => {
    const filter = await this.getParams({ $gt: id }, props);
    const res = Article.findOne(filter, anotherFields)
      // 获取上一篇需要注意排序，需要将createTime设置为正序排列
      .sort({ _id: 1, createTime: 1 })
      .limit(1);

    return res;
  };

  // 获取下一篇文章
  getNextArticle = async (id, props) => {
    const filter = await this.getParams({ $lt: id }, props);
    const res = Article.findOne(filter, anotherFields)
      // 获取上一篇需要注意排序，需要将createTime设置为倒叙序排列
      .sort({ _id: -1, createTime: -1 })
      .limit(1);

    return res;
  };

  // 获取文章总条数
  async getArticleTotal(filter) {
    const res = Article.find(filter).count();
    return res;
  }

  // 高级搜索
  searchArticles = async ({
    pageNo = 1,
    pageSize = 20,
    keyword,
    userId,
    filterList,
  }) => {
    // 获取文章列表时，需要先根据userId判断文章点赞状态
    await this.checkLikeStatus(userId);

    const filterKey = getAdvancedSearchFilter({ filterList, keyword });

    const sortType = getSortType(filterList);

    const res = await this.getArticleListWithTotal({
      filterKey,
      pageNo,
      pageSize,
      sortType,
    });

    if (filterList.includes("isLike")) {
      const likes = await this.getLikeArticles(userId);
      const articleIds = likes.map((i) => i.articleId);
      const list = res?.list.filter((i) =>
        articleIds.includes(i.id.toString())
      );
      return {
        total: list.length,
        list: list,
      };
    } else {
      return res;
    }
  };
}

module.exports = new articleServer();
