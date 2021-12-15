const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');
const User = db.user;

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers['x-access-token'];

    if (!token) {
      return res.status(403).send({
        message: 'Не надано токен!'
      });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Неавторизований вхід!' });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const isAdmin = (req, res, next) => {
  try {
    User.findByPk(req.userId).then(user => {
      user.getRights().then(rights => {
        for (let i = 0; i < rights.length; i++) {
          if (rights[i].name === 'admin') {
            next();
            return;
          }
        }

        res.status(403).send({
          message: 'Необхідні права Адміністратора!'
        });
        return;
      });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const isModerator = (req, res, next) => {
  try {
    User.findByPk(req.userId).then(user => {
      user.getRights().then(rights => {
        for (let i = 0; i < rights.length; i++) {
          if (rights[i].name === 'moderator') {
            next();
            return;
          }
        }

        res.status(403).send({
          message: 'Необхідні права Реєстратора!'
        });
      });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const isModeratorOrAdmin = (req, res, next) => {
  try {
    User.findByPk(req.userId).then(user => {
      user.getRights().then(rights => {
        for (let i = 0; i < rights.length; i++) {
          if (rights[i].name === 'moderator') {
            next();
            return;
          }

          if (rights[i].name === 'admin') {
            next();
            return;
          }
        }

        res.status(403).send({
          message: 'Необхідні права Реєстратора або Адміністратора!'
        });
      });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin
};
module.exports = authJwt;
