const bcrypt = require("bcryptjs");
const { findOneUser, findUserById } = require("../service");
const {
  databaseError,
  userFormateError,
  userAlreadyExited,
  userNotFind,
  userPwdError,
  pwdNotChange,
  fieldFormateError,
  userNotExist,
} = require("../constant");

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

  if (!username) {
    ctx.app.emit("error", fieldFormateError, ctx);
    return;
  }

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

// 校验用户是否存在
const verifyUserExists = async (ctx, next) => {
  const { userId } = ctx.request.body;

  if (!userId) {
    ctx.app.emit("error", fieldFormateError, ctx);
    return;
  }

  try {
    const user = await findUserById(userId);
    if (!user) {
      return ctx.app.emit("error", userNotExist, ctx);
    }
  } catch (error) {
    ctx.app.emit("error", databaseError, ctx);
  }

  await next();
};

// 密码加密
const bcryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  if (!password) {
    ctx.app.emit("error", fieldFormateError, ctx);
    return;
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  ctx.request.body.password = hash;

  await next();
};

// 校验用户用户名或者密码是否正确
const verifyLogin = async (ctx, next) => {
  try {
    const { username, password } = ctx.request.body;
    const filter = { username };
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
  const { password } = ctx.request.body;
  const { id } = ctx.state.user;
  try {
    const user = await findUserById(id);
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

module.exports = {
  userValidator,
  verifyUser,
  bcryptPassword,
  verifyLogin,
  verifyUpdateInfo,
  verifyUserExists,
};