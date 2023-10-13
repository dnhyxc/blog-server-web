const { Codes } = require("../../models");

class CodesServer {
  // 添加代码示例
  async addCode({ userId, title, abstract, content, language }) {
    const res = await Codes.create({
      userId,
      createTime: new Date().valueOf(),
      title,
      abstract,
      content,
      language,
    });

    return {
      id: res._id,
      userId: res.userId,
      createTime: res.createTime,
      title: res.title,
      title: res.content,
      abstract: res.abstract,
      language: res.language,
    };
  }

  // 更新代码示例
  async updateCode({ id, title, abstract, content, language }) {
    const res = await Codes.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          title,
          abstract,
          content,
          language,
          createTime: new Date().valueOf(),
        },
      }
    );
    return res.modifiedCount;
  }

  // 更新代码示例
  async getCodeById({ id }) {
    const res = await Codes.findById(id, {
      id: "$_id",
      _id: 0,
      title: 1,
      abstract: 1,
      content: 1,
      createTime: 1,
      language: 1,
    });
    return res;
  }

  // 删除图片
  async deleteCode({ id }) {
    const ids = Array.isArray(id) ? id : [id];
    const res = await Codes.deleteMany({
      _id: { $in: ids },
    });
    return res.deletedCount;
  }

  // 获取代码示例列表
  async getCodeListWithTotal({ pageNo, pageSize, userId }) {
    const list = await Codes.aggregate([
      { $match: { userId } },
      {
        $facet: {
          total: [{ $count: "count" }],
          data: [
            {
              $project: {
                id: "$_id",
                _id: 0,
                userId: 1,
                title: 1,
                content: 1,
                createTime: 1,
                abstract: 1,
                language: 1,
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

module.exports = new CodesServer();
