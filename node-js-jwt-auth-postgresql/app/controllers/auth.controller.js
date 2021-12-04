require('dotenv').config();
const genPass = require('generate-password');
const nodemailer = require('nodemailer');
const db = require('../models');
const config = require('../config/auth.config');
const User = db.user;
const Right = db.right;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

function sendEmail(password, user) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_NAME, 
      pass: process.env.EMAIL_PASSWORD
    }
  });
  let mailOptions = {
    from: process.env.EMAIL_NAME, 
    to: user.login,
    subject: 'ЄРД авторизація',
    text: `Ваш логін у системі: ${user.login}\nВаш пароль: ${password}`
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return console.log('Помилка');
    }
    return console.log('Лист надіслано!!!');
  });
}

exports.signup = (req, res) => {
  // Save User to Database
  try {
    const password = genPass.generate({
      length: 20,
      numbers: true,
      symbols: '!#@*&^'
    });
    console.log('🚀 ~ file: auth.controller.js ~ line 20 ~ password', password);
    User.create({
      fullname: req.body.fullname,
      login: req.body.login,
      password: bcrypt.hashSync(req.body.password || password, 8),
      dob: req.body.dob,
      passport_series: req.body.passportSeries,
      passport_number: req.body.passportNumber,
      passport_issue_date: req.body.passportIssueDate,
      passport_authority: req.body.passportAuthority,
      rntrc: req.body.rntrc,
      workplace_id: req.body.workplace_id,
      status_id: 1,
    }).then(user => {
      if (req.body.rights) {
        Right.findAll({
          where: {
            name: {
              [Op.or]: req.body.rights
            }
          }
        }).then(rights => {
          user.setRights(rights).then(() => {
            // sendEmail(password, user);
            res.send({ message: 'Користувача успішно зареєстровано!' });
          });
        });
      } else {
      // user right = 1
        user.setRights([1]).then(() => {
          // sendEmail(password, user);
          res.send({ message: 'Користувача успішно зареєстровано!' });
        });
      }
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      login: req.body.login
    }})
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'Користувача не знайдено.' });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Невірний пароль!'
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 5400 // 24 hours -> 86400
      });

      if(user.status_id === 1) {
        User.update({ status_id: 2 }, {
          where: {
            login: req.body.login
          }
        });
      }
      

      var authorities = [];
      user.getRights().then(rights => {
        for (let i = 0; i < rights.length; i++) {
          authorities.push('RIGHT_' + rights[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          fullname: user.fullname,
          login: user.login,
          rights: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
