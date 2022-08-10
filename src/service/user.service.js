const { User } = require("../models");

class UserServer {
  // 用户登录
  async findOneUser(filter) {
    const user = await User.findOne(filter);
    return user;
  }

  // 根据id查找用户
  async findUserById(id) {
    const user = await User.findById(id);
    return user;
  }

  // 修改用户信息
  async updateUser(userId, newUserInfo) {
    const id = { _id: userId };
    try {
      const res = await User.updateOne(id, {
        $set: newUserInfo,
      });
      return res.modifiedCount > 0 ? true : false;
    } catch (error) {
      console.error("updateUser", error);
      throw new Error(error);
    }
  }

  // 注册用户
  async createUserServer({ username, password }) {
    try {
      return await User.create({ username, password });
    } catch (error) {
      console.error("createUserServer", error);
      throw new Error(error);
    }
  }
}

module.exports = new UserServer();
