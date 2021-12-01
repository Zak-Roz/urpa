const db = require('../models');
const RIGHTS = db.RIGHTS;
const User = db.user;
const Workplace = db.workplace;

const checkDuplicateUser = (req, res, next) => {
  try {
  // Login
    console.log(req.body);
    User.findOne({
      where: {
        login: req.body.login,
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: 'Failed! Email is already in use!'
        });
        console.log('\n\n\nFailed! Email is already in use!\n\n\n');
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
            message: 'Failed! Passport number is already in use!'
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
              message: 'Failed! RNTRC is already in use!'
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
            message: 'Failed! Right does not exist = ' + req.body.rights[i]
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
    //         message: 'Workplace not found',
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
            message: 'Workplace not found',
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
