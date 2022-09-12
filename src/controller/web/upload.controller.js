const path = require("path");
const { fileUploadError } = require("../../constant");

class UploadController {
  // 文件上传
  async uploadFileCtr(ctx, next) {
    const { file } = ctx.request.files;
    if (file) {
      const basename = path.basename(file.filepath);
      ctx.body = {
        code: 200,
        message: "文件上传成功",
        success: true,
        data: {
          filePath: `${ctx.origin}/image/${basename}`,
        },
      };
    } else {
      ctx.app.emit("error", fileUploadError, ctx);
    }
  }
}

module.exports = new UploadController();
