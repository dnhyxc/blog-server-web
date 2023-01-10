module.exports = (wss) => {
  wss.on('open', function open() {
    console.log('wss is open');
  })

  wss.on('close', function close() {
    console.log('wss is close');
  })

  wss.on("connection", function connection(ws) {
    console.log("WS Server is running");

    ws.on("message", function incoming(message) {
      console.log("收到消息：", message);
    });

    ws.send("something");
  });
};
