const mongoose = require("mongoose");

const convertSchema = new mongoose.Schema({
  userId: String,
  keywords: [{
    keyword: String
  }],
  createTime: Number,
});

const Convert = mongoose.model("convert", convertSchema);

module.exports = Convert;
