const mongoose = require("mongoose");

// 联系人模型
const contactsSchema = mongoose.Schema({
  userId: String,
  contactId: String,
  createTime: Number,
  noReadCount: Number,
});

const Contacts = mongoose.model("contacts", contactsSchema);

module.exports = Contacts;
