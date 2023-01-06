const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  is_admin: Boolean,
  job: String,
  motto: String,
  headUrl: String,
  introduce: String,
  github: String,
  juejin: String,
  zhihu: String,
  blog: String,
  mainCover: String,
  auth: Number,
  logout: String,
  registerTime: Number,
  isDelete: Boolean,
  bindUserId: String,
});

const User = mongoose.model("users", userSchema);

module.exports = User;
