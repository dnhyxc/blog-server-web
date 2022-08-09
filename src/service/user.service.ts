import { FilterQuery } from "mongoose";
import { User } from "../models";

type FilterParams = FilterQuery<{
  username: string;
  password?: string | undefined;
}>;

type newUserInfo = FilterQuery<{
  username?: string;
  password?: string;
}>;

class UserServer {
  // 用户登录
  async findOneUser(filter: FilterParams) {
    try {
      const user: any = await User.findOne(filter);
      return user;
    } catch (error) {
      console.error("findOneUser", error);
      throw new Error(error as any);
    }
  }

  // 根据id查找用户
  async findUserById(id: string) {
    try {
      const user: any = await User.findById(id, {
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
      });
      return user;
    } catch (error) {
      console.error("findUserById", error);
      throw new Error(error as any);
    }
  }

  // 修改用户信息
  async updateUser(userId: string, newUserInfo) {
    const id = { _id: userId };
    try {
      const res: any = await User.updateOne(id, {
        $set: newUserInfo,
      });
      return res.modifiedCount > 0 ? true : false;
    } catch (error) {
      console.error("updateUser", error);
      throw new Error(error as any);
    }
  }

  // 注册用户
  async createUserServer({ username, password }) {
    try {
      return await User.create({ username, password });
    } catch (error) {
      console.error("createUserServer", error);
      throw new Error(error as any);
    }
  }
}

export default new UserServer();
