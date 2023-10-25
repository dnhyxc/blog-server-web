const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  from: String, // 发送用户的id
  to: String, // 接收用户的id
  chatId: String, // from和to组成的字符串
  content: String, // 内容
  read: Boolean, // 标识是否已读
  createTime: Number, // 创建时间
});

const Chat = mongoose.model("chats", chatSchema);

module.exports = Chat;
