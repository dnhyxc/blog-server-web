const app = require("./app");
const connectMongodb = require("./db");
const { PORT } = require("./config");

// 链接数据库
connectMongodb();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
