const mongoose = require("mongoose");

const connectMongodb = () => {
  mongoose
    .connect("mongodb://localhost:27017/blog_web")
    .then(() => {
      console.log("数据库连接成功！");
    })
    .catch((err) => {
      console.log("数据库连接失败！", err);
    });
};

export default connectMongodb;
