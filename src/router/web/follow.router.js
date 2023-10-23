const Router = require("koa-router");
const {
  manageFollowCtr,
  getFollowListCtr,
  getFollowMeListCtr,
  findFollowedCtr,
} = require("../../controller");

const { auth } = require("../../middleware");

const router = new Router({ prefix: "/api" });

// 关注/取消关注
router.post("/manageFollow", auth, manageFollowCtr);

// 获取关注用户列表
router.post("/getFollowList", auth, getFollowListCtr);

// 获取关注我的用户列表
router.post("/getFollowMeList", auth, getFollowMeListCtr);

// 查询是否关注
router.post("/findFollowed", auth, findFollowedCtr);

module.exports = router;
