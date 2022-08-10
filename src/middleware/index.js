const {
  userValidator,
  verifyUser,
  bcryptPassword,
  verifyLogin,
  verifyUpdateInfo,
} = require("./user.middleware");

const { auth } = require("./auth.middleware");

module.exports = {
  userValidator,
  verifyUser,
  bcryptPassword,
  verifyLogin,
  auth,
  verifyUpdateInfo,
};
