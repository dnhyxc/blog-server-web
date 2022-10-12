const {
  userValidator,
  verifyUser,
  bcryptPassword,
  verifyLogin,
  verifyUpdateInfo,
  verifyUserExists,
  verifyUserExistsByUsername,
  verifyAdminLogin,
  verifyAdminUpdateInfo,
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
  verifyAdminLogin,
  verifyAdminUpdateInfo,
  auth,
  adminAuth,
  verifyCollection,
};
