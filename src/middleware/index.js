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

const { auth } = require("./auth.middleware");

module.exports = {
  userValidator,
  verifyUser,
  bcryptPassword,
  verifyLogin,
  auth,
  verifyUpdateInfo,
  verifyUserExists,
  verifyAdminLogin,
  verifyAdminUpdateInfo,
};
