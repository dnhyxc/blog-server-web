const {
  userValidator,
  verifyUser,
  bcryptPassword,
  verifyLogin,
  verifyUpdateInfo,
  verifyUserExists,
  verifyAdminLogin,
  verifyAdminUpdateInfo,
} = require("./user.middleware");

const { auth, adminAuth } = require("./auth.middleware");

module.exports = {
  userValidator,
  verifyUser,
  bcryptPassword,
  verifyLogin,
  verifyUpdateInfo,
  verifyUserExists,
  verifyAdminLogin,
  verifyAdminUpdateInfo,
  auth,
  adminAuth,
};
