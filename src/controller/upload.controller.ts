import path from "path";
import { fileUploadError } from "../constant";

class UploadController {
  // 创建文章
  async uploadFileCtr(ctx, next) {
    const { file } = ctx.request.files;
    if (file) {
      const basename = path.basename(file.filepath);
      ctx.body = {
        code: 200,
        message: "文件上传成功",
        data: {
          filePath: `${ctx.origin}/${basename}`,
        },
      };
    } else {
      ctx.app.emit("error", fileUploadError, ctx);
    }
  }
}

export default new UploadController();
