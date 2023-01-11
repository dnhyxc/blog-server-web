const Koa = require("koa");
const koaBody = require("koa-body");
const koaStatic = require("koa-static");
const path = require("path");
const websockify = require("koa-websocket");
const router = require("../router/web");
const routerAdmin = require("../router/admin");
const { errorHandler } = require("../utils");
const routerWs = require("../router/ws");

const app = websockify(new Koa());

app.use(koaStatic(path.join(__dirname, "../upload")));

// 注册解析参数的中间件
app.use(
  koaBody({
    // // 支持文件上传
    multipart: true,
    formidable: {
      // 图片保存的静态资源文件路径
      uploadDir: path.join(__dirname, "../upload/image"),
      // 是否保留扩展名
      keepExtensions: true,
      // 文件上传大小
      maxFieldsSize: 20 * 1024 * 1024,
    },
  })
);

app.ws.use((ctx, next) => {
  console.log(ctx, "ctx");
  return next(ctx);
});

app.ws.use(routerWs.routes()).use(routerWs.allowedMethods());

// 前台路由注册
app.use(router.routes()).use(router.allowedMethods());

// 后台路由注册
app.use(routerAdmin.routes()).use(routerAdmin.allowedMethods());

app.on("error", errorHandler);

module.exports = app;
