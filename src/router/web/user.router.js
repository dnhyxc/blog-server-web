const Router = require("koa-router");
const {
  registerCtr,
  loginCtr,
  updateInfoCtr,
  resetPwdCtr,
  logoutCtr,
  getUserInfoCtr,
  verifyTokenCtr,
  findMenusCtr,
} = require("../../controller");
const {
  userValidator,
  verifyUser,
  bcryptPassword,
  bcryptPhone,
  verifyPhone,
  verifyLogin,
  auth,
  verifyUpdateInfo,
  verifyUserExistsByUsername,
  verifyUserExists,
} = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 注册接口
router.post(
  "/register",
  userValidator, // 检验用户名或密码是否为空中间件
  verifyUser, // 检验用户名是否存在中间件
  bcryptPassword, // 密码加密中间件
  bcryptPhone, // 密码号码中间件
  registerCtr
);

// 登录接口
router.post("/login", userValidator, verifyLogin, loginCtr);

// 获取用户信息
router.post("/getUserInfo", getUserInfoCtr);

// 注销
router.post("/logout", auth, verifyUserExists, logoutCtr);

// 修改用户信息接口
router.put(
  "/updateInfo",
  auth,
  verifyUserExists,
  // verifyUpdateInfo,
  updateInfoCtr
);

// 重置密码
router.put(
  "/resetPassword",
  // auth,
  verifyUserExistsByUsername,
  // verifyUpdateInfo,
  verifyPhone,
  bcryptPassword,
  resetPwdCtr
);

// 校验token是否过期
router.post("/verify", auth, verifyTokenCtr);

// 获取菜单权限列表
router.post("/getUserMenuRoles", auth, findMenusCtr);

module.exports = router;
