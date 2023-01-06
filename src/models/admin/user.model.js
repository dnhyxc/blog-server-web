const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  headUrl: String,
  auth: Number,
  registerTime: Number,
  logout: String,
  bindUserIds: [String],
});

const AdminUsers = mongoose.model("adminUsers", userSchema);

module.exports = AdminUsers;
