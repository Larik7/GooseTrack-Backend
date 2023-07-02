
const bcrypt = require('bcryptjs');
const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');

const checkPass = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const passwordCompare = bcrypt.compareSync(oldPassword, req.user.password);

  if (!passwordCompare) {
    throw HttpError(400, 'invalid password');
  }
  const hashPassword = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(req.user.id, { password: hashPassword });

  res.status(200).json({
    tatus: 'success',
    code: 200,
    data: passwordCompare,
  });
};

module.exports = checkPass;