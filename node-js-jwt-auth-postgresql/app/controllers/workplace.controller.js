const db = require('../models');
// const { Op } = require('sequelize');
const Workplace = db.workplace;

exports.getAll = (req, res) => {
  try {
    Workplace.findAll({ attributes: ['organization_name'], raw: true})
      .then((work) => {
        if (!work) {
          throw new Error('Місце роботи не знайдено!');
        }
        // console.log(work);
        return res.json(work);
      }).catch(err => {
        return res.status(500).send({ message: err.message });
      });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// get Workplace from Database
exports.getByName = (req, res) => {
  try {
    const {organization_name, /*email*/} = req.query;
    // console.log('\n\n\n\n\n\n\n\n');
    // console.log(email || organization_name);
    // if (email || organization_name) {
    Workplace.findOne({
      where: {
        organization_name,
        // [Op.or]: [
        //   { organization_name },
        //   { email }
        // ]
      }
    }).then((work) => {
      if (!work) {
        throw new Error('Місце роботи не знайдено!');
      }
      return res.json(work);
    }).catch(err => {
      return res.status(500).send({ message: err.message });
    });
    // }
    // throw new Error('Необхідно ввести ім`я!');
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.getById = (req, res) => {
  try {
    Workplace.findByPk(req.query.id)
      .then((work) => {
        if (!work) {
          throw new Error('Місце роботи не знайдено!');
        }
        return res.json(work);
      }).catch(err => {
        return res.status(500).send({ message: err.message });
      });
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
      return res.send({ message: 'Місце роботи успішно створено!' });
    }).catch(err => {
      return res.status(500).send({ message: err.message });
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
