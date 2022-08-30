const Router = require("koa-router");
const {
  adminRegisterCtr,
  adminLoginCtr,
  adminGetUserInfoCtr,
  adminUpdateInfoCtr,
  adminVerifyTokenCtr,
} = require("../../controller");
const {
  userValidator,
  verifyUser,
  bcryptPassword,
  verifyLogin,
  auth,
  verifyUpdateInfo,
  verifyUserExists,

  // 后台中间件
  verifyAdminLogin,
  verifyAdminUpdateInfo,
} = require("../../middleware");

const router = new Router({ prefix: "/admin" });

// 注册接口
router.post(
  "/register",
  userValidator, // 检验用户名或密码是否为空中间件
  verifyUser, // 检验用户名是否存在中间件
  bcryptPassword, // 密码加密中间件
  adminRegisterCtr
);

// 登录接口
router.post("/login", userValidator, verifyAdminLogin, adminLoginCtr);

// 获取用户信息
router.post("/getUserInfo", adminGetUserInfoCtr);

// 修改用户信息接口
router.put(
  "/updateInfo",
  auth,
  verifyUserExists,
  // verifyUpdateInfo,
  adminUpdateInfoCtr
);

// 修改用户信息接口
router.put(
  "/updatePassword",
  auth,
  verifyUserExists,
  // verifyUpdateInfo,
  bcryptPassword,
  adminUpdateInfoCtr
);

// 校验token是否过期
router.post("/verify", auth, adminVerifyTokenCtr);

module.exports = router;
