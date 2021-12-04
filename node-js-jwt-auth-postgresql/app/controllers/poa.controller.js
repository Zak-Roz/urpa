const db = require('../models');
// const User = db.user;
const Poa = db.poa;

// get Poa from Database
exports.getOne = async (req, res) => {
  try {
    const {
      blank_series, blank_number,
      register_number, registration_date
    } = req.query;

    let poas;

    if (!blank_series && !blank_number
      && !register_number && !registration_date) {
      poas = await Poa.findAll();
    } //for debugging get all poas

    if (blank_number && blank_series) {
      poas = await Poa.findOne({
        where: {
          blank_number,
          blank_series
        }
      });
    }

    if (register_number && registration_date) {
      poas = await Poa.findOne({
        where: {
          register_number,
          registration_date
        }
      });
    }

    if (register_number && registration_date && blank_number ||
      register_number && registration_date && blank_series) {
      poas = await Poa.findOne({
        where: {
          register_number,
          registration_date
        }
      });
    }

    return res.json(poas);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.create = (req, res) => {
  // Save Poa to Database
  // try {
  const currentMonth = (new Date().getMonth() + 1) < 10 ? `0${(new Date().getMonth() + 1)}` : `${(new Date().getMonth() + 1)}`;
  const currentDay = new Date().getDate() < 10 ? `0${(new Date().getDate())}` : `${(new Date().getDate())}`;
  const currentYear = new Date().getFullYear();
  const dateNow = `${currentYear}-${currentMonth}-${currentDay}`;
  Poa.create({
    principal_name: req.body.principal_name,
    principal_code: req.body.principal_code,
    confident_name: req.body.confident_name,
    confident_code: req.body.confident_code,
    registration_date: dateNow,
    blank_series: req.body.blank_series,
    blank_number: req.body.blank_number,
    certification_date: req.body.certification_date,
    // register_number: req.body.register_number,
    expiry_date: req.body.expiry_date,
    is_duplicate: req.body.is_duplicate || false,
    registrar_id: req.body.registrar_id,
    property: req.body.property,
  }).then(() => {
    res.send({ message: 'Довіреність успішно створено!' });
  });
  //   .catch(err => {
  //     res.status(500).send({ message: err.message });
  //   });
  // } catch (err) {
  //   res.status(500).send({ message: err.message });
  // }
};

// TODO poa update
exports.update = (req, res) => {
  Poa.findByPk(req.body.poa_id)
    .then(poa => {
      if (!poa) {
        return res.status(404).send({ message: 'Довіреність не знайдено.' });
      }
      Poa.update({ status_id: 2 }, {
        where: {
          login: req.body.login
        }
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
