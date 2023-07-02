const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');
const { FRONT_BASE_URL, SECRET_KEY, REFRESH_SECRET_KEY } =
  process.env;

const googleAuth = async (req, res) => {
  const id = req.user._id;
  const payload = { id };

  const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: '7d',
  });
  await User.findByIdAndUpdate(id, { accessToken, refreshToken, verify: true });

  res.redirect(`${FRONT_BASE_URL}/mainLayout`);
};
  
module.exports = googleAuth;