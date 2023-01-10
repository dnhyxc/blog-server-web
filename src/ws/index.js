module.exports = (wss) => {
  wss.on("connection", function connection(ws) {
    console.log("WS Server is running");

    ws.on("message", function incoming(message) {
      console.log("收到消息：", message);
    });

    ws.send("something");
  });
};
