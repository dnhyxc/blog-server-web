const Koa = require("koa");
const koaBody = require("koa-body");
const koaStatic = require("koa-static");
const path = require("path");
const router = require("../router");
const connectMongodb = require("../db");
const errorHandler = require("../utils");

const app = new Koa();

// 链接数据库
connectMongodb();

// 注册解析参数的中间件
app.use(
  koaBody({
    // // 支持文件上传
    multipart: true,
    formidable: {
      // 图片保存的静态资源文件路径
      uploadDir: path.join(__dirname, "../upload"),
      // 是否保留扩展名
      keepExtensions: true,
      // 文件上传大小
      maxFieldsSize: 20 * 1024 * 1024,
    },
  })
);

app.use(koaStatic(path.join(__dirname, "../upload")));

app.use(router.routes()).use(router.allowedMethods());

app.on("error", errorHandler);

module.exports = app;