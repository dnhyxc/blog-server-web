const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema({
  name: String,
  count: Number,
  desc: String,
  status: Number,
  createTime: Number,
  articleIds: [String]
});

const Collection = mongoose.model("collections", CollectionSchema);

module.exports = Collection;
