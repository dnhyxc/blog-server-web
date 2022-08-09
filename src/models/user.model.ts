import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  is_admin: Boolean,
  job: String,
  motto: String,
  headUrl: String,
  introduce: String,
  github: String,
  juejin: String,
  zhihu: String,
  blog: String,
});

const User = mongoose.model("users", userSchema);

export default User;
