const path = require("path");
const fs = require("fs");
const { fileUploadError, fileNotFound } = require("../../constant");

const publicPath = path.join(__dirname, "../../upload/image");

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

  /**
   * 参数说明： filePath 为要删除的文件路径
   */
  async removeFileCtr(ctx, next) {
    const { url } = ctx.request.body;
    const index = url.lastIndexOf("/");
    const sliceUrl = url.substring(index + 1, url.length);
    const filePath = path.normalize(`${publicPath}/${sliceUrl}`);
    // 判断文件是否存在
    if (fs.existsSync(filePath)) {
      try {
        const stats = fs.statSync(filePath);
        // 判断是否是文件
        if (stats?.isFile()) {
          // 删除文件
          fs.unlinkSync(filePath);
          ctx.body = {
            code: 200,
            message: "文件删除成功",
            success: true,
          };
        }
      } catch (error) {
        ctx.app.emit("error", fileNotFound, ctx);
      }
      // 判断是否是文件夹
      // if (stats.isDirectory()) {
      //   let filesArr = fs.readdirSync(filePath);
      //   filesArr.forEach((file) => {
      //     removeFiles(path.resolve(filePath, file));
      //   });
      //   fs.rmdirSync(filePath);
      // }
    } else {
      ctx.app.emit("error", fileNotFound, ctx);
    }
  }

  // 大文件上传
  async downLoadFileCtr(ctx, next) {
    ctx.body = {
      code: 200,
      message: "获取文件成功",
      success: true,
      data: {
        filePath: `${ctx.origin}/image/dnhyxc.zip`,
      },
    };
  }
}

module.exports = new UploadController();
