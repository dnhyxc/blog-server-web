import jwt from "jsonwebtoken";
import { createUserServer, findOneUser, updateUser } from "../service";
import { databaseError } from "../constant";

import { JWT_SECRET } from "../config";

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

  async updateInfoCtr(ctx, next) {
    const { username, password } = ctx.request.body;
    const { id } = ctx.state.user;
    try {
      const res = await updateUser({ id }, { username, password });
      if (res) {
        ctx.body = {
          code: 200,
          success: true,
          message: "修改成功",
          data: {
            id,
            username,
          },
        };
      }
    } catch (error) {
      console.error("updateInfoCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }
}

export default new UserController();
