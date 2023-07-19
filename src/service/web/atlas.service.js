const { Atlas } = require("../../models");

class AtlasServer {
  // 添加图片
  async addAtlasImages({ userId, url }) {
    const findOne = await Atlas.findOne(
      {
        url,
      },
      {
        id: "$_id",
        _id: 0,
        createTime: 1,
        url: 1,
        userId: 1,
      }
    );
    if (findOne) return findOne;
    const res = await Atlas.create({
      userId,
      url,
      createTime: new Date().valueOf(),
    });

    return {
      userId: res.userId,
      createTime: res.createTime,
      url: res.url,
      id: res._id,
    };
  }

  // 获取我的关注列表
  async getAtlasWithTotal({ pageNo, pageSize, userId }) {
    const list = await Atlas.aggregate([
      // { $match: { myUserId: userId } },
      {
        $facet: {
          total: [{ $count: "count" }],
          data: [
            {
              $project: {
                id: "$_id",
                _id: 0,
                userId: 1,
                url: 1,
                createTime: 1,
                isDelete: 1,
              },
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
  }

  // 删除图片
  async deleteAtlasImages({ id }) {
    const ids = Array.isArray(id) ? id : [id];
    const res = await Atlas.deleteMany({
      _id: { $in: ids },
    });
    return res.deletedCount;
  }
}

module.exports = new AtlasServer();
