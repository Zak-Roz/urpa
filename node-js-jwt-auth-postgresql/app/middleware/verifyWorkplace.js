const db = require('../models');
const Workplace = db.workplace;

const checkDuplicateEmailOrName = (req, res, next) => {
  // organization_name
  Workplace.findOne({
    where: {
      organization_name: req.body.organization_name,
    }
  }).then(workplace => {
    if (workplace) {
      res.status(400).send({
        message: 'Помилка! Назва установи вже зайнята!'
      });
      return;
    }
    // email
    Workplace.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: 'Помилка! Електронна пошла вже зайнята!'
        });
        return;
      }

      next();
    });
  });
};

const verifyWorkplace = {
  checkDuplicateEmailOrName,
};

module.exports = verifyWorkplace;
