const jwt = require('jsonwebtoken');
const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');
const { FRONT_BASE_URL, SECRET_KEY, REFRESH_SECRET_KEY } =  process.env;


const verifyEmail = async (req, res) => {
  const verificationToken = req.params.verificationToken;
  const user = await User.findOne({ verificationToken: verificationToken });
  if (!user) {
    throw HttpError(404, 'not found');
  }
  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });

  const payload = { id: user._id };
  const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: '7d',
  });
  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });
  console.log('accessToken:', accessToken);

  res.redirect(`${FRONT_BASE_URL}/login`);
};

module.exports = verifyEmail;