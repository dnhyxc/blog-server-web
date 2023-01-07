const mongoose = require("mongoose");

const pageConfigSchema = new mongoose.Schema({
  adminUserId: String,
  bindUserId: String,
  username: String,
  layout: Number,
  layoutSet: Number,
  cardLayout: Number,
  coverImg: [String],
  createTime: Number,
});

const PageConfig = mongoose.model("pageConfig", pageConfigSchema);

module.exports = PageConfig;
