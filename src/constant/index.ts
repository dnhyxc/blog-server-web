// 操作数据库报错统一错误提示
const databaseError = {
  code: "10000",
  success: false,
  message: "数据库错误",
  data: "",
};

const userFormateError = {
  code: "10001",
  success: false,
  message: "用户名或密码不能为空",
  data: "",
};

const fieldFormateError = {
  code: "10001",
  success: false,
  message: "参数异常",
  data: "",
};

const userAlreadyExited = {
  code: "10002",
  success: false,
  message: "用户已存在",
  data: "",
};

const userRegisterError = {
  code: "10003",
  success: false,
  message: "用户注册错误",
  data: "",
};

const userLoginError = {
  code: "10004",
  success: false,
  message: "用户登录错误",
  data: "",
};

const userNotFind = {
  code: "10005",
  success: false,
  message: "用户不存在",
  data: "",
};

const userPwdError = {
  code: "10006",
  success: false,
  message: "密码错误",
  data: "",
};

const pwdNotChange = {
  code: "10007",
  success: false,
  message: "密码与原来一致",
  data: "",
};

const TokenExpiredError = {
  code: "10101",
  success: false,
  message: "token已过期",
  data: new Date().valueOf(),
};

const JsonWebTokenError = {
  code: "10102",
  success: false,
  message: "无效的token",
  data: new Date().valueOf(),
};

const fileUploadError = {
  code: "10201",
  success: false,
  message: "文件上传失败",
  data: "",
};

export {
  databaseError,
  userFormateError,
  userAlreadyExited,
  userRegisterError,
  userLoginError,
  userPwdError,
  userNotFind,
  pwdNotChange,
  TokenExpiredError,
  JsonWebTokenError,
  fileUploadError,
  fieldFormateError,
};
