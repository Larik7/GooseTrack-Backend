const jwt = require('jsonwebtoken');
const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');
const { SECRET_KEY, REFRESH_SECRET_KEY } = process.env;


const refresh = async (req, res) => {
  const { refreshToken: rToken } = req.body;
  console.log('rToken:', rToken);

  try {
    const { id } = jwt.verify(rToken, REFRESH_SECRET_KEY);
    console.log('id:', id);
    const isExist = await User.findOne({ refreshToken: rToken });
    if (!isExist) {
      throw HttpError(403, 'token is not valid');
    }

    const payload = { id };

    const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: '7d',
    });

    res.status(200).json({
      status: 'success',
      code: 200,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    throw HttpError(403, error.message);
  }
};

module.exports = refresh;