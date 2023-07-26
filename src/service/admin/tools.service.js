const { Tools } = require("../../models");

class ToolsServer {
  // 添加工具
  async adminAddTools({ toolName, toolHref, toolUrl, powerUsers }) {
    // 删除之前绑定的账号配置
    const res = await Tools.create({
      toolName,
      toolHref,
      toolUrl,
      powerUsers,
      createTime: new Date().valueOf(),
    });
    return res;
  }

  // 获取工具列表
  async adminGetToolListWithTotal({ pageNo, pageSize, userId, type = "all" }) {
    const filters =
      type !== "all"
        ? {
            $or: [
              // 查询数组对象（powerUsers:[{username:'xxx',id:'1'},{username:'xxx',id:'2'}]）中id为userId的某一项
              { powerUsers: { $elemMatch: { id: userId } } },
              { powerUsers: { $size: 0 } }, // 查询powerUsers为空的
            ],
          }
        : {};

    const skipRule = [{ $skip: (pageNo - 1) * pageSize }, { $limit: pageSize }];

    const facetDataRule = [
      {
        $project: {
          id: "$_id",
          _id: 0,
          toolName: 1,
          toolHref: 1,
          toolUrl: 1,
          powerUsers: 1,
          createTime: 1,
          sort: 1,
        },
      },
      {
        $sort: { sort: 1, createTime: -1 },
      },
    ];

    if (type === "all") {
      facetDataRule.concat(skipRule);
    }

    const list = await Tools.aggregate([
      {
        $match: filters,
      },
      {
        $facet: {
          total: [{ $count: "count" }],
          data: facetDataRule,
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

  // 更新工具
  async adminUpdateTools({
    id,
    toolName,
    toolHref,
    toolUrl,
    powerUsers,
    sortInfo = null,
  }) {
    if (sortInfo) {
      sortInfo.forEach(async (item) => {
        await Tools.updateMany({ id: item.id }, { $set: { sort: item.sort } });
      });
      return sortInfo.length;
    } else {
      const res = await Tools.updateMany(
        {
          _id: id,
        },
        {
          $set: {
            toolName,
            toolHref,
            toolUrl,
            powerUsers,
          },
        }
      );
      return res.modifiedCount;
    }
  }

  // 删除工具
  async adminDeleteTools({ ids }) {
    const filterIds = Array.isArray(ids) ? ids : [ids];
    const res = await Tools.deleteMany({
      _id: { $in: filterIds },
    });

    return res.deletedCount;
  }
}

module.exports = new ToolsServer();
