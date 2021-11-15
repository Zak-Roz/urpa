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
        message: 'Failed! Organization name is already in use!'
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
          message: 'Failed! Email is already in use!'
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
