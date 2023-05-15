const path = require("path");
const fs = require("fs");
const { fileUploadError, fileNotFound } = require("../../constant");

class UploaderController {
  async uploadSingleCtr(ctx, next) {
    try {
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
    } catch (error) {
      ctx.app.emit("error", fileNotFound, ctx);
    }
  }
}

module.exports = new UploaderController();
