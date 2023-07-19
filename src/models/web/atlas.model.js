const mongoose = require("mongoose");

const atlasSchema = new mongoose.Schema({
  userId: String,
  url: String,
  createTime: Number,
  isDelete: Boolean,
});

const Atlas = mongoose.model("atlas", atlasSchema);

module.exports = Atlas;
