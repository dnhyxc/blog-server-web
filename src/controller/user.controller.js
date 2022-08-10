const jwt = require("jsonwebtoken");
const { databaseError } = require("../constant");
const { JWT_SECRET } = require("../config");
const {
  createUserServer,
  findOneUser,
  updateUser,
  findUserById,
} = require("../service");

class UserController {
  async registerCtr(ctx, next) {
    const { username, password } = ctx.request.body;
    try {
      const res = await createUserServer({ username, password });
      ctx.body = {
        code: 200,
        message: "注册成功",
        success: true,
        data: res?.id,
      };
    } catch (error) {
      console.error("registerCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  async loginCtr(ctx, next) {
    const { username } = ctx.request.body;
    // 1. 获取用户信息（在token的playload中，记录id，username）
    try {
      const { password, ...props } = (await findOneUser({ username })) || {};
      const { _id: id, username: user_name, is_admin } = props._doc || {};
      ctx.body = {
        code: 201,
        success: true,
        message: "登录成功",
        data: {
          isAdmin: is_admin,
          id,
          username: user_name,
          token: jwt.sign(props, JWT_SECRET, { expiresIn: "1d" }),
        },
      };
    } catch (error) {
      console.error("loginCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 获取用户信息
  async getUserInfoCtr(ctx, next) {
    const { userId } = ctx.request.body;
    try {
      const res = await findUserById(userId);
      ctx.body = res;
    } catch (error) {
      console.error("getUserInfo", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 更新用户信息
  async updateInfoCtr(ctx, next) {
    const { userId, ...params } = ctx.request.body;
    try {
      await updateUser(userId, params);
      const userInfo = await findUserById(userId);
      if (userInfo) {
        ctx.body = {
          code: 200,
          success: true,
          message: "修改成功",
          data: userInfo,
        };
      }
    } catch (error) {
      console.error("updateInfoCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }
}

module.exports = new UserController();
