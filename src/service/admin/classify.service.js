const { Classify } = require("../../models");

class ClassifyServer {
  // 根据标签名查找标签
  adminFindCLassify = async ({ classifyName }) => {
    const res = await Classify.findOne(
      { classifyName },
      { id: "$_id", _id: -1, classifyName: 1 }
    );
    return res;
  };

  // 创建分类
  async adminCreateClassify({ classifyName }) {
    const findOne = await new ClassifyServer().adminFindCLassify({
      classifyName,
    });
    if (findOne) {
      return false;
    } else {
      return await Classify.create({
        classifyName,
        addCount: 0,
        userIds: [],
        articleIds: [],
        createTime: new Date().valueOf(),
      });
    }
  }

  // 更新分类
  async adminUpdateClassify({
    classifyNames,
    userIds,
    articleIds,
    isDelete = false,
  }) {
    const articleIdList =
      articleIds && Array.isArray(articleIds) ? articleIds : [articleIds];
    // const userIdList = userIds && Array.isArray(userIds) ? userIds : [userIds];

    console.log(articleIds, "articleIds", articleIdList);

    console.log(articleIdList, classifyNames, ">>>>>>uid");

    // 判断是否是删除，如果是删除，则需要把相关的用户及文章从分类中删除
    const config = !isDelete
      ? {
          // 注意：如果要使用排序，$sort必须与$each一起使用才会生效
          // $addToSet会进行去重添加操作，$push不会进行去重添加操作
          $addToSet: {
            articleIds: { $each: articleIdList },
            // userIds: { $each: userIdList },
          },
          $set: {
            createTime: new Date().valueOf(),
          },
        }
      : {
          // 将对应的文章及用户从 articleIds/userIds 中删除
          $pull: {
            articleIds: { $in: articleIds },
            // userIds: { $in: userIdList },
          },
        };

    console.log(config, "config");

    const res = await Classify.updateMany(
      { classifyName: { $in: classifyNames } },
      config
    );

    if (!res.matchedCount) {
      console.log("需要手动创建这个分类");
    } else {
      console.log(res, "res>>>跟新文章分类");
      return res;
    }
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
      icon: 1,
      classifyName: 1,
      articleCount: { $size: "$articleIds" }, // 获取classifyIds数组的数量
      userCount: { $size: "$userIds" }, // 获取userIds数组的数量
      createTime: 1,
      articleIds: 1,
      userIds: 1,
    };

    const list = await Classify.aggregate([
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
