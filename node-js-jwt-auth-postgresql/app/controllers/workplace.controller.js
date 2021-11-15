const db = require('../models');
const { Op } = require('sequelize');
const Workplace = db.workplace;

// get Workplace from Database
exports.get = (req, res) => {
  try {
    const {organization_name, email} = req.query;
    console.log('\n\n\n\n\n\n\n\n');
    // console.log(email || organization_name);
    // if (email || organization_name) {
    Workplace.findOne({
      where: {
        [Op.or]: [
          { organization_name },
          { email }
        ]
      }
    }).then((work) => {
      if (!work) {
        throw new Error('Workplace don`t found!');
      }
      return res.json(work);
    }).catch(err => {
      return res.status(500).send({ message: err.message });
    });
    // }
    // throw new Error('Name is required!');
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.create = (req, res) => {
  // Save Workplace to Database
  try {
    Workplace.create({
      organization_name: req.body.organization_name,
      email: req.body.email,
    }).then(() => {
      return res.send({ message: 'Workplace was created successfully!' });
    }).catch(err => {
      return res.status(500).send({ message: err.message });
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
