const { Collection } = require("../../models");
const { collectionRes } = require("../../constant");

class collectionServer {
  // 创建收藏集
  createCollection = async ({ ...params }) => {
    return await Collection.create({
      ...params,
      count: 0,
      articleIds: [],
      createTime: new Date().valueOf()
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
          count: 1
        },
      },
    )
    return res
  }
}

module.exports = new collectionServer();
