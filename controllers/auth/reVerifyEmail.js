const { User } = require('../../models/user');
const { HttpError, sendEmail } = require('../../helpers');
const EmailVerifycation = { status: true, title: 'verifycation' };
const { BASE_URL } =  process.env;


const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, 'not found');
  }
  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed');
  }

  await sendEmail(
    email,
    EmailVerifycation.title,
    `<a target="_blanck" href="${BASE_URL}/api/auth/verify/${user.verificationToken}"> verify your email - click here <a/>`
  );

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { message: 'Verification email sent' },
  });
};

module.exports = resendVerifyEmail;