const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');

const loginWithToken = async (req, res) => {
  const accessToken = req.params.accessToken;
  const user = await User.findOne({
    accessToken: accessToken,
  });
  if (!user) {
    throw HttpError(401, 'Token is invalid');
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    accessToken: accessToken,
    refreshToken: user.refreshToken,
  });
};

module.exports = loginWithToken;