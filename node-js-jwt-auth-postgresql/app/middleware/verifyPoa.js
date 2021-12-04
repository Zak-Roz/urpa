const db = require('../models');
const Poa = db.poa;
const User = db.user;

const checkDuplicateBlank_SAN = (req, res, next) => {
  try {
  // blank_series
    Poa.findOne({
      where: {
        blank_series: req.body.blank_series,
      }
    }).then(poa => {
      if (poa) {
        if(poa.blank_number === req.body.blank_number && req.body.is_duplicate) next();
        res.status(400).send({
          message: 'Помилка! Задана серія бланку вже зайнята!'
        });
        return;
      }
      // blank_number
      Poa.findOne({
        where: {
          blank_number: req.body.blank_number
        }
      }).then(poa => {
        if (poa) {
          res.status(400).send({
            message: 'Помилка! Заданий номер бланку вже зайнятий!'
          });
          return;
        }

        next();
      });
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const checkUsersExisted = (req, res, next) => {
  try {
    User.findByPk(req.body.registrar_id)
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: 'Реєстратора не знайдено',
          });
        }

        next();
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const verifyWorkplace = {
  checkDuplicateBlank_SAN,
  checkUsersExisted,
};

module.exports = verifyWorkplace;
