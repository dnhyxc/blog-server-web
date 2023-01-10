const http = require("http");
const Koa = require("koa");
const koaBody = require("koa-body");
const koaStatic = require("koa-static");
const path = require("path");
const WebSocket = require("ws");
const router = require("../router/web");
const routerAdmin = require("../router/admin");
const connectMongodb = require("../db");
const { errorHandler } = require("../utils");

const app = new Koa();

const WebSocketApi = require("../ws"); //引入封装的ws模块

const server = http.createServer(app.callback());

const wss = new WebSocket.Server({
  // 同一个端口监听不同的服务
  server,
});

WebSocketApi(wss);

// 链接数据库
connectMongodb();

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

app.use(koaStatic(path.join(__dirname, "../upload")));

// 前太路由注册
app.use(router.routes()).use(router.allowedMethods());

// 后台路由注册
app.use(routerAdmin.routes()).use(routerAdmin.allowedMethods());

app.on("error", errorHandler);

module.exports = app;
