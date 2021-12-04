exports.allAccess = (req, res) => {
  res.status(200).send('Публічні дані.');
};

exports.userBoard = (req, res) => {
  res.status(200).send('Дані Користувача.');
};

exports.adminBoard = (req, res) => {
  res.status(200).send('Дані Адміністратора.');
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send('Дані Реєстратора.');
};
