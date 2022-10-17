const { Collection } = require("../../models");
const { collectionRes } = require("../../constant");

class collectionServer {
  // 创建收藏集
  createCollection = async ({ ...params }) => {
    return await Collection.create({
      ...params,
      count: 0,
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
  getCollectionWithTotal = async ({ pageNo, pageSize, userId }) => {
    const list = await Collection.aggregate([
      { $match: { userId } },
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
  };
  // 分页获取收藏集
  getCollectionList = async ({ pageNo, pageSize, userId }) => {
    return await this.getCollectionWithTotal({ pageNo, pageSize, userId });
  };
  // 收藏文章
  collectArticles = async ({ ids, articleId, userId }) => {
    const res = Collection.updateMany(
      { _id: { $in: ids }, userId },
      // 向查找到的document中的replyList数组中插入一条评论
      // 注意：如果要使用排序，$sort必须与$each一起使用才会生效
      {
        $push: {
          articleIds: {
            // 不使用用$each包一下sort不会生效
            $each: [articleId], // $each可向articleIds中插入多条
            $sort: { date: -1 }, // 倒序排列
          },
        },
        $inc: {
          count: 1,
        },
      }
    );
    return res;
  };
  // 获取文章收藏状态
  checkCollectionStatus = async ({ articleId, userId }) => {
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
      // 向查找到的document中的replyList数组中插入一条评论
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
      { "$match": { userId } },
      {
        "$project": {
          "_id": 0,
          "name": 1,
          "total": { "$size": "$articleIds" }
        }
      }
    ])
    return res
  }
  // 删除
  delCollection = async ({ userId, id }) => {
    const res = Collection.deleteOne({ _id: id, userId })
    return res
  }
}

module.exports = new collectionServer();
