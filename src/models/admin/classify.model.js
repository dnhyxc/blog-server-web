const mongoose = require("mongoose");

const classifySchema = new mongoose.Schema({
  addCount: Number,
  icon: String,
  userIds: [String],
  classifyName: String,
  articleIds: [String],
  createTime: Number,
});

const Classify = mongoose.model("classify", classifySchema);

module.exports = Classify;
