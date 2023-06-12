const {
  userValidator,
  verifyUser,
  bcryptPassword,
  verifyLogin,
  verifyUpdateInfo,
  verifyUserExists,
  verifyUserExistsByUsername,
  verifyAdminUserExistsByUsername,
  verifyAdminLogin,
  verifyAdminUpdateInfo,
  verifyAdminUser,
} = require("./user.middleware");

const { auth, adminAuth } = require("./auth.middleware");

const { verifyCollection } = require("./common.middleware");

module.exports = {
  userValidator,
  verifyUser,
  bcryptPassword,
  verifyLogin,
  verifyUpdateInfo,
  verifyUserExists,
  verifyUserExistsByUsername,
  verifyAdminUserExistsByUsername,
  verifyAdminLogin,
  verifyAdminUpdateInfo,
  auth,
  adminAuth,
  verifyCollection,
  verifyAdminUser,
};
