const mongoose = require("mongoose");

const classifySchema = new mongoose.Schema({
  addCount: Number,
  userIds: [String],
  classifyName: String,
  articleIds: [String],
  createTime: Number,
});

const Classify = mongoose.model("classify", classifySchema);

module.exports = Classify;
