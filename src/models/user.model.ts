import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  is_admin: Boolean,
});

const User = mongoose.model("users", userSchema);

export default User;
