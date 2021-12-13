const db = require('../models');
const RIGHTS = db.RIGHTS;
const User = db.user;
const Workplace = db.workplace;

const checkDuplicateUser = (req, res, next) => {
  try {
  // Login
    // console.log(req.body);
    User.findOne({
      where: {
        login: req.body.login,
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: 'Помилка! Електронна пошта вже зайнята!'
        });
        // console.log('\n\n\nПомилка! Електронна пошта вже зайнята!\n\n\n');
        return;
      }
      // passport_number
      User.findOne({
        where: {
          passport_number: req.body.passportNumber
        }
      }).then(user => {
        if (user) {
          res.status(400).send({
            message: 'Помилка! Номер паспорту вже зайнятий!'
          });
          return;
        }
        // RNTRC
        User.findOne({
          where: {
            rntrc: req.body.rntrc
          }
        }).then(user => {
          if (user) {
            res.status(400).send({
              message: 'Помилка! РНОКПП вже зайнятий!'
            });
            return;
          }
  
          next();
        });
      });
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const checkRightsExisted = (req, res, next) => {
  try {
    if (req.body.rights) {
      for (let i = 0; i < req.body.rights.length; i++) {
        if (!RIGHTS.includes(req.body.rights[i])) {
          return res.status(400).send({
            message: 'Помилка! Не існує таких прав доступу: ' + req.body.rights[i]
          });
        }
      }
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const checkWorkplaceExisted = (req, res, next) => {
  try {
    // Workplace.findByPk(req.body.workplace_id)
    //   .then(work => {
    //     if (!work) {
    //       return res.status(400).send({
    //         message: 'Місце роботи не знайдено',
    //       });
    //     }

    //     next();
    //   }).catch(err => {
    //     res.status(500).send({ message: err.message });
    //   });
    Workplace.findOne({
      where: {
        organization_name: req.body.organization_name
      }})
      .then(work => {
        if (!work) {
          return res.status(400).send({
            message: 'Місце роботи не знайдено. Виберіть іншу або створіть нову',
          });
        }
        req.body.workplace_id = work.id;
        next();
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const verifySignUp = {
  checkDuplicateUser,
  checkRightsExisted,
  checkWorkplaceExisted,
};

module.exports = verifySignUp;
