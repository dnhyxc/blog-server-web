const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  userId: String,
  createTime: Number,
  title: String,
  content: String,
  abstract: String,
  language: String,
});

const Codes = mongoose.model("code", codeSchema);

module.exports = Codes;
