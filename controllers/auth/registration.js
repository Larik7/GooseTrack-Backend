const bcrypt = require('bcryptjs');
const { nanoid } = require('nanoid');
const { User } = require('../../models/user');
const { HttpError, sendEmail } = require('../../helpers');
const EmailVerifycation = { status: true, title: 'verifycation' };
const { BASE_URL } = process.env;

const registration = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    throw HttpError(409, 'such email is already exist');
  }

  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const verifycationCode = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    verificationToken: verifycationCode,
  });
  const htmlContent = `
    <h1>Welcome to Goose-Track</h1>
    <p>Hello, thanks for signing up for our service. Please verify your email by clicking the link below:</p>
    <p><a href="${BASE_URL}/api/auth/verify/${verifycationCode}">Start your plans</a></p>
    <p>If you did not sign up for this account, you can ignore this email.</p>
    `;

  if (EmailVerifycation.status === true) {
    await sendEmail(req.body.email, EmailVerifycation.title, htmlContent);
  }

  res.status(201).json({
    status: 'success',
    code: 201,
    data: { name: newUser.name, email: newUser.email },
  });
};

module.exports = registration;