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

const userNotExist = {
  code: "10009",
  success: false,
  message: "该用户已奔赴星辰大海，再难寻回",
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

const anotherFields = {
  id: "$_id",
  _id: 0,
  title: 1,
  tag: 1,
  classify: 1,
  abstract: 1,
  createTime: 1,
  authorId: 1,
  authorName: 1,
};

const detailFields = {
  id: "$_id",
  _id: 0,
  title: 1,
  content: 1,
  classify: 1,
  tag: 1,
  abstract: 1,
  createTime: 1,
  coverImage: 1,
  authorId: 1,
  likeCount: 1,
  isLike: 1,
  authorName: 1,
  replyCount: 1,
};

const userFields = {
  username: 1,
  job: 1,
  motto: 1,
  headUrl: 1,
  introduce: 1,
  github: 1,
  juejin: 1,
  zhihu: 1,
  blog: 1,
  mainCover: 1,
  auth: 1,
};

module.exports = {
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
  userNotExist,
  anotherFields,
  detailFields,
  userFields,
};
