const { AdminUsers, User } = require("../../models");
const { userFields } = require("../../constant");

class UserServer {
  // 注册用户
  async adminCreateUserServer({ username, password }) {
    return await AdminUsers.create({
      username,
      password,
      registerTime: new Date().valueOf(),
    });
  }

  // 用户登录
  async adminFindOneUser(filter) {
    const user = await AdminUsers.findOne(filter, {
      userId: `${"$_id".toString()}`,
      _id: 1,
      password: 1,
      ...userFields,
    });
    return user;
  }

  // 根据id查找用户
  async adminFindUserById(id) {
    const user = await AdminUsers.findById(id, {
      userId: "$_id",
      _id: 0,
      ...userFields,
      logout: 1,
    });
    return user;
  }

  // 获取用户列表同时返回文章总条数
  async adminGetUserListWithTotal({ filterKey, pageNo, pageSize, searchType }) {
    const aggregateData = [
      { $match: filterKey || {} },
      {
        $facet: {
          total: [{ $count: "count" }],
          data: [
            {
              $project: {
                _id: 0, // 默认情况下_id是包含的，将_id设置为0|false，则选择不包含_id，其他字段也可以这样选择是否显示。
                id: "$_id", // 将_id更名为classify
                ...userFields,
              },
            },
            { $sort: { registerTime: -1 } },
            { $skip: (pageNo - 1) * pageSize },
            { $limit: pageSize },
          ],
        },
      },
    ];

    const users =
      searchType === 1
        ? await User.aggregate(aggregateData)
        : await AdminUsers.aggregate(aggregateData);

    if (users?.length) {
      const { total, data } = users[0];
      return {
        total: total[0]?.count || 0,
        list: data || [],
      };
    }
    return {
      total: 0,
      list: [],
    };
  }

  // 查询前台用户列表
  async adminGetUserList({ filterKey, pageNo, pageSize }) {
    const res = await new UserServer().adminGetUserListWithTotal({
      filterKey,
      pageNo,
      pageSize,
      searchType: 1, // 1：查前台用户列表  2：查后台用户列表
    });
    return res;
  }

  // 查询后台用户列表
  async adminGetAdminUserList({ filterKey, pageNo, pageSize }) {
    const res = await new UserServer().adminGetUserListWithTotal({
      filterKey,
      pageNo,
      pageSize,
      searchType: 2, // 1：查前台用户列表  2：查后台用户列表
    });
    return res;
  }

  // 修改用户信息
  async adminUpdateUser(userId, newUserInfo) {
    const id = { _id: userId };
    const res = await AdminUsers.updateOne(id, {
      $set: newUserInfo,
    });
    return res.modifiedCount > 0 ? true : false;
  }

  // 批量删除用户
  async adminBatchDeleteUser({ userIds }) {
    const res = await User.deleteMany({ _id: { $in: userIds } });
    return res.deletedCount;
  }

  // 批量为用户添加删除标识
  async adminUpdateUsers({ userIds, type }) {
    await User.updateMany(
      { _id: { $in: userIds } },
      {
        $set: {
          isDelete: type ? true : false,
        },
      }
    );
    return userIds;
  }

  // 设置为博主
  async adminSetAuth({ auth, userId }) {
    await User.updateOne({ auth }, { $unset: { auth } });
    const data = await User.updateOne({ _id: userId }, { $set: { auth } });
    return data.modifiedCount;
  }
}

module.exports = new UserServer();
