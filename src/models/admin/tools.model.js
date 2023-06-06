const mongoose = require("mongoose");

const toolsSchema = new mongoose.Schema({
  toolName: String,
  toolHref: String,
  toolUrl: String,
  powerUsers: [
    {
      username: String,
      id: String,
    },
  ],
  createTime: Number,
});

const Tools = mongoose.model("tools", toolsSchema);

module.exports = Tools;
