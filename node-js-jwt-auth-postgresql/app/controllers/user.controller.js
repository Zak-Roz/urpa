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
