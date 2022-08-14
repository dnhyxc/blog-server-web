const { User } = require("../models");

class UserServer {
  // 用户登录
  async findOneUser(filter) {
    const user = await User.findOne(filter, {
      userId: "$_id",
      _id: 0,
      password: 1,
      username: 1,
      job: 1,
      motto: 1,
      headUrl: 1,
      introduce: 1,
      github: 1,
      juejin: 1,
      zhihu: 1,
      blog: 1,
      mainCover: 1,
    });
    return user;
  }

  // 根据id查找用户
  async findUserById(id) {
    const user = await User.findById(id, {
      userId: "$_id",
      _id: 0,
      username: 1,
      job: 1,
      motto: 1,
      headUrl: 1,
      introduce: 1,
      github: 1,
      juejin: 1,
      zhihu: 1,
      blog: 1,
      mainCover: 1,
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
