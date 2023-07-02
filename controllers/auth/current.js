const current = async (req, res) => {
  const {
    name,
    email,
    avatarURL,
    birthday,
    phone,
    skype,
    createdAt,
    updatedAt,
  } = req.user;

  res.status(200).json({
    status: 'success',
    code: 200,
    user: {
      name: name,
      email: email,
      avatarURL: avatarURL,
      birthday: birthday,
      phone: phone,
      skype: skype,
      createdAt: createdAt,
      updatedAt: updatedAt,
    },
  });
};

module.exports = current;