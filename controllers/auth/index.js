const { ctrlWrapper } = require('../../helpers');
const registration = require('./registration');
const login = require('./login');
const loginWithToken = require('./loginWithToken');
const current = require('./current');
const logout = require('./logout');
const { updateUser, updateUserTwo } = require('./update');
const verifyEmail = require('./verifyEmail');
const resendVerifyEmail = require('./reVerifyEmail');
const googleAuth = require('./googleAuth');
const refresh = require('./refresh');
const checkPass = require('./checkPass');


module.exports = {
  registration: ctrlWrapper(registration),
  login: ctrlWrapper(login),
  loginWithToken: ctrlWrapper(loginWithToken),
  getCurrent: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  updateUser: ctrlWrapper(updateUser),
  updateUserCloud: ctrlWrapper(updateUserTwo),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  googleAuth: ctrlWrapper(googleAuth),
  refreshToken: ctrlWrapper(refresh),
  checkPass: ctrlWrapper(checkPass),
};