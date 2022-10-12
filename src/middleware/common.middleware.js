const { findOneCollection } = require("../service");
const {
  databaseError,
  collectionAlreadyExited,
  fieldFormateError,
} = require("../constant");

// 校验收藏集是否存在
const verifyCollection = async (ctx, next) => {
  const { name } = ctx.request.body;

  if (!name) {
    ctx.app.emit("error", fieldFormateError, ctx);
    return;
  }

  try {
    if (await findOneCollection({ name })) {
      return ctx.app.emit("error", collectionAlreadyExited, ctx);
    }
  } catch (error) {
    ctx.app.emit("error", databaseError, ctx);
  }

  await next();
};

module.exports = { verifyCollection };
