const Router = require("koa-router");
const {
  registerCtr,
  loginCtr,
  updateInfoCtr,
  getUserInfoCtr,
  verifyTokenCtr,
} = require("../../controller/web");
const {
  userValidator,
  verifyUser,
  bcryptPassword,
  verifyLogin,
  auth,
  verifyUpdateInfo,
  verifyUserExists,
} = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 注册接口
router.post(
  "/register",
  userValidator, // 检验用户名或密码是否为空中间件
  verifyUser, // 检验用户名是否存在中间件
  bcryptPassword, // 密码加密中间件
  registerCtr
);

// 登录接口
router.post("/login", userValidator, verifyLogin, loginCtr);

// 获取用户信息
router.post("/getUserInfo", getUserInfoCtr);

// 修改用户信息接口
router.put(
  "/updateInfo",
  auth,
  verifyUserExists,
  // verifyUpdateInfo,
  updateInfoCtr
);

// 修改用户信息接口
router.put(
  "/updatePassword",
  auth,
  verifyUserExists,
  // verifyUpdateInfo,
  bcryptPassword,
  updateInfoCtr
);

// 校验token是否过期
router.post("/verify", auth, verifyTokenCtr);

module.exports = router;
