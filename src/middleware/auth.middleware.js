const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const {
  TokenExpiredError,
  JsonWebTokenError,
  databaseError,
} = require("../constant");

const auth = async (ctx, next) => {
  try {
    const { authorization } = ctx.request.header;
    const token = authorization.replace("Bearer ", "");
    const userInfo = jwt.verify(token, JWT_SECRET);
    const { _id, username, password } = userInfo._doc;
    const user = {
      id: _id,
      username,
      password,
    };
    ctx.state.user = user;
  } catch (error) {
    switch (error.name) {
      case "TokenExpiredError":
        // console.error("token已过期", error);
        return ctx.app.emit("error", TokenExpiredError, ctx);
      case "JsonWebTokenError":
        // console.error("无效的token", error);
        return ctx.app.emit("error", JsonWebTokenError, ctx);
      default:
        return ctx.app.emit("error", databaseError, ctx);
    }
  }

  await next();
};

module.exports = { auth };
