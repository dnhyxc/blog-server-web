const jwt = require("jsonwebtoken");
const { databaseError, userNotExist } = require("../../constant");
const { JWT_SECRET } = require("../../config");
const {
  createUserServer,
  findOneUser,
  updateUser,
  findUserById,
  getArticleTotal,
  updateAuthorName,
} = require("../../service");

class UserController {
  // 账号注册
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

  // 账号登录
  async loginCtr(ctx, next) {
    const { username } = ctx.request.body;
    // 1. 获取用户信息（在token的playload中，记录id，username）
    try {
      const { password, ...props } = (await findOneUser({ username })) || {};
      delete props?._doc.password;
      delete props?._doc._id;
      ctx.body = {
        code: 201,
        success: true,
        message: "登录成功",
        data: {
          ...props?._doc,
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
    const { userId, auth, needTotal } = ctx.request.body;
    const authorInfo = auth && (await findOneUser({ auth: 1 }));

    let filter = "";
    if (auth) {
      filter = authorInfo?._id?.toString();
    } else {
      filter = userId;
    }

    try {
      const articleTotal =
        needTotal &&
        (await getArticleTotal({
          isDelete: { $nin: [true] },
          authorId: authorInfo?._id?.toString(),
        }));

      const res = await findUserById(filter);
      if (!res) {
        ctx.app.emit("error", userNotExist, ctx);
        return;
      }
      ctx.body = {
        code: 200,
        success: true,
        message: "获取用户信息成功",
        data: {
          ...res?._doc,
          articleTotal,
        },
      };
    } catch (error) {
      console.error("getUserInfo", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 更新用户信息
  async updateInfoCtr(ctx, next) {
    const { userId, ...params } = ctx.request.body;
    if (!userId) {
      ctx.app.emit("error", fieldFormateError, ctx);
      return;
    }
    try {
      // 更新用户名称时，需要同时更新当前用户的所有文章中的作者名称
      await updateAuthorName(userId, params.username);
      const filter = { _id: userId }
      await updateUser(filter, params);
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

  // 重置密码
  async resetPwdCtr(ctx, next) {
    const { password, username } = ctx.request.body;
    if (!password || !username) {
      ctx.app.emit("error", fieldFormateError, ctx);
      return;
    }
    try {
      const filter = { username }
      await updateUser(filter, { password });
      const { ...props } = await findOneUser({ username }) || {}
      delete props?._doc.password;
      delete props?._doc._id;
      ctx.body = {
        code: 200,
        success: true,
        message: "密码修改成功",
        data: props?._doc,
      };
    } catch (error) {
      console.error("resetPwdCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  // 校验token是否过期
  async verifyTokenCtr(ctx, next) {
    try {
      ctx.body = {
        code: 200,
        success: true,
        message: "effective",
        data: 1,
      };
    } catch (error) {
      console.error("verifyTokenCtr", error);
      ctx.app.emit("error", databaseError, ctx);
    }
  }
}

module.exports = new UserController();
