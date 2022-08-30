const mongoose = require("mongoose");

const connectMongodb = () => {
  mongoose
    .connect("mongodb://localhost:27017/blog_web")
    .then(() => {
      console.log("mongoose connect success");
    })
    .catch((err) => {
      console.log("mongoose connect error", err);
    });
};

module.exports = connectMongodb;
