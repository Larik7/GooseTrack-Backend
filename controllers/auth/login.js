const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');
const { HttpError } = require('../../helpers');
const EmailVerifycation = { status: true, title: 'verifycation' };
const { SECRET_KEY, REFRESH_SECRET_KEY } = process.env;


const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw HttpError(401, 'Email or password ivalid');
  }

  const passwordCompare = bcrypt.compareSync(req.body.password, user.password);

  if (!user.verify && EmailVerifycation.status === true) {
    throw HttpError(401, 'Email not verifyed');
  }

  if (!passwordCompare) {
    throw HttpError(401, 'Email or password ivalid');
  }

  const payload = { id: user._id };

  const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: '7d',
  });

  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });
  res.status(200).json({
    name:user.name,
    email: user.email,
    accessToken,
    refreshToken,
  });
};

module.exports = login;