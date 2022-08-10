const mongoose = require("mongoose");

const mode = process.env.NODE_ENV;

const dbpath =
  mode === "dev"
    ? "mongodb://localhost:27017/blog_web"
    : "mongodb://47.97.107.28:27017/blog_web";

const connectMongodb = () => {
  mongoose
    .connect(dbpath)
    .then(() => {
      console.log("数据库连接成功！");
    })
    .catch((err) => {
      console.log("数据库连接失败！", err);
    });
};

export default connectMongodb;
