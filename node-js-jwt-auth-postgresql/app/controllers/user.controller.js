const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.user;

exports.allUsers = async (req, res) => {
  try {
    const poas = await User.findAll();
    return res.json(poas);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.query;
    let user = null;
    if (id) {
      user = await User.findByPk(id);
      const authorities = [];
      const rights = await  user.getRights();
      for (let i = 0; i < rights.length; i++) {
        authorities.push(rights[i].name);
      }
      return res.json({user, authorities});
    }
    return res.json(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findUser = async (req, res) => {
  try {
    let user = null;
    const { fullname, passport_serias, rntrc, passport_number, login } = req.query;
    if (fullname && !user) await User.findOne({
      where: {
        fullname
      }
    }).then((result) => { user = result; });
    if (rntrc && !user) await User.findOne({
      where: {
        rntrc
      }
    }).then((result) => { user = result; });
    if (login && !user) await User.findOne({
      where: {
        login
      }
    }).then((result) => { user = result; });
    if (passport_number && !user) await User.findOne({
      where: {
        passport_number
      }
    }).then((result) => {
      if (result.passport_serias === passport_serias) {
        user = result;
      }
    });
    return res.json(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updatePass = (req, res) => {
  User.findOne({
    where: {
      login: req.body.login
    }})
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'Користувача не знайдено.' });
      }

      const passwordDublicate = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (passwordDublicate) {
        return res.status(401).send({
          message: 'Новий пароль зараз використовуться!',
        });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.oldPassword,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          message: 'Пароль не вірний',
        });
      }
      const password = bcrypt.hashSync(req.body.password, 8);
      User.update({ password: password }, {
        where: {
          login: req.body.login
        }
      }).then(() => {
        return res.send({ message: 'Пароль успішно змінено!' });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

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
