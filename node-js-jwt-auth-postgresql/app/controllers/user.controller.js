const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.user;
const Right = db.right;
const Op = db.Sequelize.Op;

exports.allUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
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
      if (user) {
        const authorities = [];
        const rights = await user.getRights();
        for (let i = 0; i < rights.length; i++) {
          authorities.push(rights[i].name);
        }
        return res.json({user, authorities});
      }
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

exports.update = (req, res) => {
  User.findByPk(req.body.id)
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'Користувача не знайдено.' });
      }
      if (req.body.status_id === 3) {
        User.update({ status_id: 3 }, {
          where: {
            id: req.body.id
          }
        }).then(() => {
          return res.send({ message: 'Користувача успішно деактивовано!' });
        });
      }
      User.update({ 
        fullname: user.fullname,
        login: user.login,
        // password: user.password,
        dob: user.dob,
        passport_serias: user.passport_serias,
        passport_number: user.passport_number,
        passport_issue_date: user.passport_issue_date,
        passport_authority: user.passport_authority,
        rntrc: user.rntrc,
        workplace_id: user.workplace_id,
      }, {
        where: {
          id: req.body.id
        }
      }).then(() => {
        Right.findAll({
          where: {
            name: {
              [Op.or]: req.body.rights
            }
          }
        }).then(rights => {
          user.setRights(rights).then(() => {
            return res.send({ message: 'Користувача успішно оновлено!' });
          });
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};