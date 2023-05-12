const { Interact } = require("../../models");

class interactServer {
  // 发布留言
  async createInteract(params) {
    await Interact.create({
      ...params,
      createTime: new Date().valueOf(),
    });
  }

  // 获取留言
  async getInteracts(params) {
    const res = await Interact.find(
      {},
      {
        id: "$id",
        _id: 0,
        userId: 1,
        username: 1,
        avatar: 1,
        createTime: 1,
        comment: 1,
      }
    )
      .sort({
        createTime: -1,
      })
      .limit(300);

    return res;
  }

  // 分页获取留言列表
  async getInteractsWithTotal({ pageNo, pageSize }) {
    const list = await Interact.aggregate([
      {
        $facet: {
          total: [{ $count: "count" }],
          data: [
            {
              $project: {
                id: "$_id",
                _id: 0,
                userId: 1,
                username: 1,
                createTime: 1,
                comment: 1,
                avatar: 1,
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
}

module.exports = new interactServer();
