const { Collection } = require("../../models");
const { collectionRes } = require("../../constant");

class collectionServer {
  // 创建收藏集
  createCollection = async ({ ...params }) => {
    return await Collection.create({
      ...params,
      count: 0,
      articleIds: [],
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
              $sort: { createTime: -1, count: -1 },
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
}

module.exports = new collectionServer();
