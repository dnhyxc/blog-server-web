const { Follow } = require("../../models");

class FollowServer {
  // 查询是否已经关注
  async findFollowed({ userId, authorId }) {
    const find = await Follow.findOne({
      myUserId: userId, // 发起关注的用户id
      userId: authorId, // 被关注的用户Id
    });
    return find;
  }

  // 关注
  async manageFollow({ userId, followInfo }) {
    // 查找
    const find = await new FollowServer().findFollowed({
      userId,
      authorId: followInfo._doc?.userId,
    });
    // 如果find有值说明点赞过，需要删除，否则就是没点过赞，需要创建，同时点赞数要加一
    if (find) {
      // 创建
      await Follow.deleteOne({
        myUserId: userId, // 发起关注的用户id
        userId: followInfo._doc?.userId, // 被关注的用户Id
      });
      return false;
    } else {
      // 创建
      await Follow.create({
        myUserId: userId, // 发起关注的用户id
        ...followInfo._doc,
        createTime: new Date().valueOf(),
        isFollowed: true,
      });
      return true;
    }
  }

  // 获取我的关注列表
  async getFollowListWithTotal({ pageNo, pageSize, userId }) {
    const list = await Follow.aggregate([
      { $match: { myUserId: userId } },
      {
        $facet: {
          total: [{ $count: "count" }],
          data: [
            {
              $project: {
                id: "$_id",
                _id: 0,
                myUserId: 1,
                userId: 1,
                username: 1,
                job: 1,
                motto: 1,
                headUrl: 1,
                introduce: 1,
                github: 1,
                juejin: 1,
                zhihu: 1,
                blog: 1,
                createTime: 1,
                isFollowed: 1,
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

  // 更新关注的用户信息
  async updateFollowUserInfo(userId, followInfo) {
    const res = await Follow.updateOne(
      {
        myUserId: userId,
        userId: followInfo?.userId,
      },
      {
        $set: {
          ...followInfo,
        },
      }
    );

    console.log(res, "更新关注用户信息成功");

    return res.modifiedCount;
  }
}

module.exports = new FollowServer();
