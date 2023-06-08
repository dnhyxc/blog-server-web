const { Article } = require("../../models");

class statisticsServer {
  // 获取时间轴文章列表
  async adminGetArticlesStatistics() {
    const list = await Article.aggregate([
      {
        $match: {
          $and: [{ isDelete: { $nin: [true] } }],
        },
      },
      {
        $project: {
          year: {
            $dateToString: {
              // "%Y-%m-%d" => 2022-07-21
              format: "%Y", // 只解析年
              date: { $add: [new Date(0), "$createTime"] },
            },
          },
          month: {
            $dateToString: {
              // "%Y-%m-%d" => 2022-07-21
              format: "%m", // 解析年月
              date: { $add: [new Date(0), "$createTime"] },
            },
          },
          title: 1,
          classify: 1,
          tag: 1,
          coverImage: 1,
          abstract: 1,
          authorId: 1,
          authorName: 1,
          isLike: 1,
          likeCount: 1,
          createTime: 1,
          readCount: 1,
          comments: 1,
          isTop: 1,
        },
      },
      {
        $group: {
          _id: {
            year: "$year",
            month: "$month",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          count: 1,
          totalAmount: 1,
        },
      },
      { $sort: { createTime: -1 } },
    ]);

    return list;
  }
}

module.exports = new statisticsServer();
