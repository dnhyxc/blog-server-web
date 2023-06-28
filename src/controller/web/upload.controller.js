const path = require("path");
const fs = require("fs");
const {
  fileUploadError,
  fileNotFound,
  fieldFormateError,
} = require("../../constant");

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

    const urls = url && Array.isArray(url) ? url : [url];

    urls.forEach((url) => {
      const index = url.lastIndexOf("/");
      const sliceUrl = url.substring(index + 1, url.length);
      const filePath = path.normalize(`${publicPath}/${sliceUrl}`);
      try {
        // 判断文件是否存在
        if (fs.existsSync(filePath)) {
          const stats = fs.statSync(filePath);
          // 判断是否是文件
          if (stats?.isFile()) {
            // 删除文件
            fs.unlinkSync(filePath);
          }
          // 判断是否是文件夹
          // if (stats.isDirectory()) {
          //   let filesArr = fs.readdirSync(filePath);
          //   filesArr.forEach((file) => {
          //     removeFiles(path.resolve(filePath, file));
          //   });
          //   fs.rmdirSync(filePath);
          // }
          ctx.body = {
            code: 200,
            message: "文件删除成功",
            success: true,
          };
        } else {
          ctx.app.emit("error", fileNotFound, ctx);
        }
      } catch (error) {
        ctx.app.emit("error", fileNotFound, ctx);
      }
    });
  }

  // 大文件上传
  async downLoadFileCtr(ctx, next) {
    const { system } = ctx.request.body;
    if (!system) {
      ctx.app.emit("error", fieldFormateError, ctx);
      return;
    }
    const file = system !== "mac" ? "dnhyxc.zip" : "dnhyxc-mac.zip";
    ctx.body = {
      code: 200,
      message: "获取文件成功",
      success: true,
      data: {
        filePath: `${ctx.origin}/image/${file}`,
      },
    };
  }
}

module.exports = new UploadController();
