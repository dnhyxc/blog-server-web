const Router = require("koa-router");
const {
  adminRegisterCtr,
  adminLoginCtr,
  adminGetUserInfoCtr,
  adminUpdateInfoCtr,
  adminVerifyTokenCtr,
  adminGetUserListCtr,
  adminGetAdminUserListCtr,
  adminBatchDeleteUserCtr,
  adminSetAuthCtr,
  adminUpdateUsersCtr,
} = require("../../controller");
const {
  userValidator,
  verifyUser,
  bcryptPassword,
  verifyUserExists,
  verifyAdminLogin,
  auth,
  adminAuth,
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
  adminAuth,
  verifyUserExists,
  // verifyUpdateInfo,
  adminUpdateInfoCtr
);

// 修改用户信息接口
router.put(
  "/updatePassword",
  adminAuth,
  verifyUserExists,
  // verifyUpdateInfo,
  bcryptPassword,
  adminUpdateInfoCtr
);

// 校验token是否过期
router.post("/verify", adminAuth, adminVerifyTokenCtr);

// 获取前台用户列表
router.post("/getUserList", adminAuth, adminGetUserListCtr);

// 获取后台用户列表
router.post("/getAdminUserList", adminAuth, adminGetAdminUserListCtr);

// 批量删除用户
router.post("/batchDeleteUser", adminAuth, adminBatchDeleteUserCtr);

// 批量为用户增加删除标识
router.post("/updateUsers", adminAuth, adminUpdateUsersCtr);

// 设置用户权限
router.post("/setAuth", adminAuth, adminSetAuthCtr);

module.exports = router;
