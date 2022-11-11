const mongoose = require("mongoose");
const { Collection } = require("../../models");
const { collectionRes } = require("../../constant");
const {
  getArticleListWithTotal,
  checkLikeStatus,
} = require("./article.service");

class collectionServer {
  // 创建收藏集
  createCollection = async ({ ...params }) => {
    return await Collection.create({
      ...params,
      articleIds: [],
      createTime: new Date().valueOf(),
    });
  };

  // 根据收藏集名称查询
  findOneCollection = async (filter) => {
    const res = await Collection.findOne(filter, collectionRes);
    return res;
  };

  // 分页获取收藏集方法
  getCollectionWithTotal = async ({
    pageNo,
    pageSize,
    userId,
    isVisitor,
    getOne,
  }) => {
    const filter = { userId };

    if (isVisitor) {
      filter.status = 1;
    }

    const list = await Collection.aggregate([
      { $match: filter },
      {
        $facet: {
          total: [{ $count: "count" }],
          data: [
            {
              $project: collectionRes,
            },
            {
              $sort: { createTime: -1 },
            },
            { $skip: (pageNo - 1) * pageSize },
            { $limit: !getOne ? pageSize : 1 },
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

  // 分页获取收藏集
  getCollectionList = async ({ pageNo, pageSize, userId, isVisitor }) => {
    return await this.getCollectionWithTotal({
      pageNo,
      pageSize,
      userId,
      isVisitor,
    });
  };

  // 收藏文章
  collectArticles = async ({ ids, articleId, userId }) => {
    const res = Collection.updateMany(
      { _id: { $in: ids }, userId },
      {
        // 注意：如果要使用排序，$sort必须与$each一起使用才会生效
        // $addToSet会进行去重添加操作，$push不会进行去重添加操作
        $addToSet: { articleIds: { $each: [articleId] }, $sort: { date: -1 } },
      }
    );

    return res;
  };

  // 获取文章收藏状态
  checkCollectionStatus = async ({ articleId, userId }) => {
    if (!userId) return;
    const res = await Collection.find(
      // 查询字段中的数组中是否包含某值，找出articleIds数组中是否包含当前的articleId
      { userId, articleIds: { $elemMatch: { $eq: articleId } } },
      collectionRes
    );
    return res;
  };

  // 取消收藏
  cancelCollected = async ({ articleId, userId }) => {
    const res = Collection.updateMany(
      // 查询条件为，查找当前用户下的，并且articleIds数组中包含articleId的所有数据
      { userId, articleIds: { $elemMatch: { $eq: articleId } } },
      // 向查找到的Collection中的articleIdst数组中插入一篇文章
      // 注意：如果要使用排序，$sort必须与$each一起使用才会生效
      {
        $pull: { articleIds: articleId },
        $inc: {
          count: -1,
        },
      }
    );
    return res;
  };

  // 获取我的收藏文章总数
  getCollectedTotal = async ({ userId }) => {
    const res = Collection.aggregate([
      { $match: { userId } },
      {
        $project: {
          _id: 0,
          name: 1,
          total: { $size: "$articleIds" },
        },
      },
    ]);
    return res;
  };

  // 删除收藏集
  delCollection = async ({ userId, id, pageNo, pageSize }) => {
    // 删除时先获取下一页的第一条数据，防止删除当前数据后，下一页第一条数据跑到上一页无法获取到
    if (pageNo && pageSize) {
      const nextPageOne = await this.getCollectionWithTotal({
        pageNo: pageNo + 1,
        pageSize,
        userId,
        getOne: true,
      });
      await Collection.deleteOne({ _id: id, userId });
      return nextPageOne;
    } else {
      await Collection.deleteOne({ _id: id, userId });
    }
  };

  // 更新收藏集
  updateCollection = async ({ id, ...props }) => {
    return await Collection.updateOne(
      { _id: id },
      {
        $set: { ...props },
      }
    );
  };

  // 获取收藏集中收藏的文章
  getCollectArticles = async ({ articleIds, pageNo, pageSize, userId }) => {
    // 返回文章列表前，首先根据userId检测点赞状态
    await checkLikeStatus(userId);
    // 需要将字符串id转为mongoose中的id类型才能查到对应的文章
    const ids = articleIds.map((i) => new mongoose.Types.ObjectId(i));
    const filterKey = {
      _id: { $in: ids },
    };
    return await getArticleListWithTotal({
      filterKey,
      pageNo,
      pageSize,
    });
  };

  // 移除指定收藏集中的文章
  removeCollectArticle = async ({ articleId, userId, id }) => {
    const res = Collection.updateOne(
      // 查询条件为，查找当前用户下的，并且articleIds数组中包含articleId的所有数据
      { _id: id, articleIds: { $elemMatch: { $eq: articleId } } },
      // 向查找到的Collection中的articleIdst数组中插入一篇文章
      // 注意：如果要使用排序，$sort必须与$each一起使用才会生效
      {
        $pull: { articleIds: articleId },
        $inc: {
          count: -1,
        },
      }
    );
    return res;
  };

  // 获取收藏集的总数
  getCollectTotal = async ({ userId }) => {
    const total = Collection.find({ userId }).count();
    return total;
  };
}

module.exports = new collectionServer();
