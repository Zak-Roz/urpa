const db = require('../models');
const Poa = db.poa;
const User = db.user;

const checkDuplicateBlank_SAN = (req, res, next) => {
  try {
  // blank_number
    Poa.findOne({
      where: {
        blank_number: req.body.blank_number,
      }
    }).then(poa => {
      if (poa) {
        if(poa.blank_number === req.body.blank_number && req.body.is_duplicate) next();
        res.status(400).send({
          message: 'Помилка! Заданий номер бланку вже зайнятий!'
        });
        return;
      }
      next();
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const checkDuplicateAll = (req, res, next) => {
  try {
    // confident_name
    console.log(req.body);
    Poa.findOne({
      where: {
        confident_name: req.body.confident_name,
        confident_code: `${req.body.confident_code}`,
        principal_code: `${req.body.principal_code}`,
        principal_name: req.body.principal_name,
        property: req.body.property,
        expiry_date: req.body.expiry_date,
      }
    }).then(poa => {
      console.log('/n/n/n');
      console.log(poa);
      console.log('/n/n/n');
      if (poa) {
        res.status(400).send({
          message: 'Помилка! Дані вже є в реєстрі!'
        });
        return;
      }
      next();
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
  checkDuplicateAll,
  checkUsersExisted,
};

module.exports = verifyWorkplace;
