const { Collection } = require("../../models");
const { detailFields } = require("../../constant");

class collectionServer {
  // 创建收藏集
  createCollection = async ({ ...params }) => {
    return await Collection.create({
      ...params,
      count: 0,
      articleIds: []
    });
  };
}

module.exports = new collectionServer();
