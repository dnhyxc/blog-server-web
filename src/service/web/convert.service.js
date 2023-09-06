const { Convert } = require("../../models");

class convertServer {
  // 创建转换列表
  async createConvert({ userId, keyword }) {
    // 查找
    const res = await Convert.create({
      userId: userId,
      keywords: [keyword],
    });

    return res
  }

  // 添加转换列表
  async updateConvert({ userId, keyword }) {
    const res = await Convert.findOneAndUpdate(
      { userId },
      { $push: { keywords: { $each: [keyword], $position: 0, $slice: 5 } } },
      { new: true },
    );

    console.log(res, 'res')
  }

  // 删除
  async deleteConvert({ userId, id }) {
    const ids = Array.isArray(id) ? id : [id]
    const res = await Convert.deleteMany({ userId, 'keywords._id': { $in: ids } });
    console.log(res, 'res>>>>deleteConvert')
  }
}

module.exports = new convertServer();
