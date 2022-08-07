import Router from "koa-router";
import { uploadFileCtr } from "../controller";
import { auth } from "../middleware";

const router = new Router({ prefix: "/api" });

// 创建文章
router.post("/upload", auth, uploadFileCtr);

module.exports = router;
