const { AdminUsers } = require("../../models");
const { userFields } = require("../../constant");

class UserServer {
  // 用户登录
  async adminFindOneUser(filter) {
    console.log(filter, "filter");
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

  // 修改用户信息
  async adminUpdateUser(userId, newUserInfo) {
    const id = { _id: userId };
    const res = await AdminUsers.updateOne(id, {
      $set: newUserInfo,
    });
    return res.modifiedCount > 0 ? true : false;
  }

  // 注册用户
  async adminCreateUserServer({ username, password }) {
    return await AdminUsers.create({ username, password });
  }
}

module.exports = new UserServer();
