const Router = require("koa-router");

const router = new Router();

router.all("/ws", async (ctx) => {
  console.log(ctx, "ctx");

  ctx.websocket.send("连接成功");

  ctx.websocket.on("message", (message) => {
    const data = JSON.parse(message);

    switch (data.type) {
      case "heart":
        console.log("heart", data);
        return data;

      default:
        break;
    }
  });

  ctx.websocket.on("close", (state) => {
    console.log("websocket close", state);
  });

  ctx.websocket.on("open", (state) => {
    console.log("websocket open", state);
  });
});

module.exports = router;
