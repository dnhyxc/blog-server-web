const mongoose = require("mongoose");

const themeSchema = new mongoose.Schema({
  name: String,
  size: Number,
  type: String,
  url: String,
  auth: [
    {
      username: String,
      userId: String,
    },
  ],
});

const Themes = mongoose.model("themes", themeSchema);

module.exports = Themes;
