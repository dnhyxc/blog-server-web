const mongoose = require("mongoose");
const {
  checkLikeStatus,
  getArticleListWithTotal,
} = require("./article.service");

class userInfoServer {
  // 获取我的文章
  async getMyArticleList({ pageNo = 1, pageSize = 20, userId, accessUserId }) {
    // 返回文章列表前，首先根据userId检测点赞状态
    await checkLikeStatus(accessUserId || userId);
    const filterKey = {
      $and: [{ isDelete: { $nin: [true] }, authorId: userId }],
    };
    const res = await getArticleListWithTotal({ filterKey, pageNo, pageSize });
    return res;
  }

  // 获取点赞文章
  async getLikeArticleList({
    pageNo = 1,
    pageSize = 20,
    userId,
    accessUserId,
  }) {
    // 返回文章列表前，首先根据userId检测点赞状态
    const likes = await checkLikeStatus(userId);
    const articleIds = likes.map((i) => {
      return new mongoose.Types.ObjectId(i.articleId);
    });
    const filterKey = {
      $and: [{ isDelete: { $nin: [true] }, _id: { $in: articleIds } }],
    };
    accessUserId && (await checkLikeStatus(accessUserId));
    const res = await getArticleListWithTotal({ filterKey, pageNo, pageSize });
    return res;
  }
}

module.exports = new userInfoServer();
