const { User } = require("../../models");
const { userFields } = require("../../constant");

class UserServer {
  // 用户登录
  async findOneUser(filter) {
    const user = await User.findOne(filter, {
      userId: `${"$_id".toString()}`,
      _id: 1,
      password: 1,
      ...userFields,
    });
    return user;
  }

  // 根据id查找用户
  async findUserById(id) {
    const user = await User.findById(id, {
      userId: "$_id",
      _id: 0,
      ...userFields,
      logout: 1,
    });
    return user;
  }

  // 修改用户信息
  async updateUser(userId, newUserInfo) {
    const id = { _id: userId };
    const res = await User.updateOne(id, {
      $set: newUserInfo,
    });
    return res.modifiedCount > 0 ? true : false;
  }

  // 注册用户
  async createUserServer({ username, password }) {
    return await User.create({ username, password });
  }
}

module.exports = new UserServer();
