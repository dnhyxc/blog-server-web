import { checkLikeStatus, getArticleListWithTotal } from "../service";

class userInfoServer {
  // 获取我的文章
  async getMyArticleList({ pageNo = 1, pageSize = 20, userId }) {
    // 返回文章列表前，首先根据userId检测点赞状态
    await checkLikeStatus(userId);
    const filterKey = {
      $and: [{ isDelete: { $nin: [true] }, authorId: userId }],
    };
    const res = await getArticleListWithTotal({ filterKey, pageNo, pageSize });
    return res;
  }

  // 获取点赞文章
  async getLikeArticleList({ pageNo = 1, pageSize = 20, userId }) {
    // 返回文章列表前，首先根据userId检测点赞状态
    await checkLikeStatus(userId);
    const filterKey = {
      $and: [{ isDelete: { $nin: [true] }, authorId: userId, isLike: true }],
    };
    const res = await getArticleListWithTotal({ filterKey, pageNo, pageSize });
    return res;
  }
}

export default new userInfoServer();
