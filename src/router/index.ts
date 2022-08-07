import Router from "koa-router";
import fs from "fs";

const router = new Router();

// 自动导入路由
fs.readdirSync(__dirname).forEach((file) => {
  if (file !== "index.ts") {
    let route = require("./" + file);
    router.use(route.routes());
  }
});

export default router;
