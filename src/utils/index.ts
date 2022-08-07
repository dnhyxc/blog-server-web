const errorHandler = (err, ctx) => {
  let status = 500;
  switch (err.code) {
    case "10001":
      status = 200;
      break;
    case "10002":
      status = 200;
      break;
    case "10003":
      status = 200;
      break;
    case "10004":
      status = 200;
      break;
    case "10005":
      status = 200;
      break;
    case "10006":
      status = 409;
    case "10101":
      status = 401;
    case "10102":
      status = 409;
      break;

    default:
      status = 500;
      break;
  }
  ctx.status = status;
  ctx.body = err;
};

export default errorHandler;
