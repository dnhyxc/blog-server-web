const { Classify } = require("../../models");

class ClassifyServer {
  // 创建分类
  async adminCreateClassify({ classifyName }) {
    return await Classify.create({
      classifyName,
      addCount: 0,
      userIds: [],
      articleIds: [],
      createTime: new Date().valueOf(),
    });
  }

  // 更新分类
  async adminUpdateClassify({
    classifyName,
    userId,
    articleId,
    isDelete = false,
  }) {
    // 判断是否是删除，如果是删除，则需要把相关的用户及文章从分类中删除
    const config = !isDelete
      ? {
          // 注意：如果要使用排序，$sort必须与$each一起使用才会生效
          // $addToSet会进行去重添加操作，$push不会进行去重添加操作
          $addToSet: {
            userIds: { $each: [userId] },
            articleIds: { $each: [articleId] },
            $sort: { date: -1 },
          },
          $inc: {
            count: 1,
          },
        }
      : {
          // 将对应的文章及用户从 articleIds/userIds 中删除
          $pull: { articleIds: articleId, userIds: userId },
          $inc: {
            count: -1,
          },
        };

    const res = await Classify.updateOne(
      { classifyName },
      {
        $set: {
          createTime: new Date().valueOf(),
          ...config,
        },
      }
    );

    console.log(res, "res>>>跟新文章分类");
  }

  // 删除文章分类
  async adminDelClassifys(ids) {
    const classifyIds = ids && Array.isArray(ids) ? ids : [ids];
    const res = await Classify.deleteMany({
      _id: { $in: classifyIds },
    });

    console.log(res, "删除文章分类");
  }

  // 获取文章分类
  async adminGetClassifyList({ pageNo, pageSize }) {
    const project = {
      id: "$_id",
      _id: 0,
      addCount: 1,
      articleCount: { $size: "$classifyIds" }, // 获取classifyIds数组的数量
      userCount: { $size: "$userIds" }, // 获取userIds数组的数量
    };

    const list = await Interact.aggregate([
      {
        $facet: {
          total: [{ $count: "count" }],
          data: [
            {
              $project: project,
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

module.exports = new ClassifyServer();
