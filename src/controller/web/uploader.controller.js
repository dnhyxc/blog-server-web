const path = require("path");
const fs = require("fs");
const { fileUploadError, fileNotFound } = require("../../constant");

class UploaderController {
  //检测文件是否已经存在
  exists(path) {
    return new Promise((resolve, reject) => {
      fs.access(path, fs.constants.F_OK, (err) => {
        if (err) {
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }

  // 文件上传
  async uploadSingleCtr(ctx, next) {
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

module.exports = new UploaderController();
