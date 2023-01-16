const { Article } = require("../../models");
const {
  checkLikeStatus,
  getArticleListWithTotal,
  computeReplyCount,
} = require("./article.service");
const { formateArrData } = require("../../utils");

class classifyServer {
  // 获取文章分类
  getClassifyList = async ({ pageNo = 1, pageSize = 20, classify, userId }) => {
    // 返回文章列表前，首先根据userId检测点赞状态
    await checkLikeStatus(userId);
    const filterKey = { $and: [{ isDelete: { $nin: [true] }, classify }] };
    const res = await getArticleListWithTotal({ filterKey, pageNo, pageSize });
    return res;
  };

  // 获取标签
  async getTagList({ pageNo = 1, pageSize = 20 }) {
    const list = await Article.aggregate([
      {
        $match: {
          isDelete: { $nin: [true] },
        },
      },
      {
        $group: {
          _id: "$tag",
          value: { $sum: 1 },
          // 使用$push存在一个问题，如果是存在重复的数据，重复的数据也会一起放入到返回的结果中，对于这样子的情况使用以下操作：
          // articles: { $push: "$title" },
        },
      },
      {
        $project: {
          _id: 0, // 默认情况下_id是包含的，将_id设置为0|false，则选择不包含_id，其他字段也可以这样选择是否显示。
          name: "$_id", // 将_id更名为classify
          value: 1,
        },
      },
    ]);
    return list;
  }

  // 获取对应的评论数
  getCommentCount = async (list) => {
    let articles = [];
    list.forEach((i) => {
      articles = [...articles, ...i.articles];
    });

    articles = await computeReplyCount(articles, true); // 第二个参数控制是否要对createTime进行时间转换

    const formatData = formateArrData(articles, "createDate");

    list.forEach((i) => {
      return {
        ...i,
        articles: formatData[i.date],
      };
    });

    return list;
  };

  // 获取时间轴文章列表
  getTimelineList = async ({ userId }) => {
    const list = await Article.aggregate([
      {
        $match: {
          $and: [{ isDelete: { $nin: [true] }, authorId: userId }],
        },
      },
      {
        $project: {
          date: {
            $dateToString: {
              // "%Y-%m-%d" => 2022-07-21
              format: "%Y", // 只解析年
              date: { $add: [new Date(0), "$createTime"] },
            },
          },
          title: "$title",
          classify: "$classify",
          tag: "$tag",
          coverImage: "$coverImage",
          abstract: "$abstract",
          authorId: "$authorId",
          authorName: "$authorName",
          isLike: "$isLike",
          likeCount: "$likeCount",
          createTime: "$createTime",
          readCount: "$readCount",
          comments: "$comments",
        },
      },
      {
        $group: {
          _id: "$date",
          count: { $sum: 1 },
          articles: {
            $push: {
              title: "$title",
              id: "$_id",
              classify: "$classify",
              tag: "$tag",
              coverImage: "$coverImage",
              abstract: "$abstract",
              authorId: "$authorId",
              authorName: "$authorName",
              isLike: "$isLike",
              likeCount: "$likeCount",
              createTime: "$createTime",
              readCount: "$readCount",
              comments: "$comments",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          count: 1,
          articles: 1,
        },
      },
      { $sort: { date: -1 } },
    ]);

    const data = this.getCommentCount(list);

    return data;
  };
}

module.exports = new classifyServer();
