const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  userId: String,
  url: String,
  createTime: Number,
  isDelete: Boolean,
  fileName: String,
  size: Number,
  type: String,
});

const Books = mongoose.model("books", bookSchema);

module.exports = Books;
