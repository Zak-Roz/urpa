const db = require('../models');
// const User = db.user;
const Poa = db.poa;

// get Poa from Database
exports.getOne = async (req, res) => {
  try {
    // console.log(req);
    // return res.json(req.query);
    const {
      blank_series, blank_number,
      register_number, registration_date
    } = req.query;

    let poas = null;

    //for debugging get all poas

    if (!blank_series && !blank_number
      && !register_number && !registration_date) {
      poas = await Poa.findAll();
    } 

    if (blank_number && blank_series) {
      poas = await Poa.findOne({
        where: {
          blank_number,
          blank_series
        }
      });
    }

    if (register_number && registration_date) {
      await Poa.findByPk(register_number)
        .then((result) => {
          if (result.registration_date === registration_date) {
            poas = result;
          }
        })
        .catch((err) => {
          return { err };
        });
    }

    // if (register_number && registration_date && blank_number ||
    //   register_number && registration_date && blank_series) {
    //   poas = await Poa.findOne({
    //     where: {
    //       register_number,
    //       registration_date
    //     }
    //   });
    // }

    return res.json(poas);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { pkId } = req.query;
    let poas = null;
    if (pkId) {
      await Poa.findByPk(pkId).then((result) => { poas = result; });
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
    is_active: true,
    registrar_id: req.body.registrar_id,
    property: req.body.property,
  }).then(() => {
    return res.send({ message: 'Довіреність успішно створено!' });
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
  Poa.findByPk(req.body.id)
    .then(poa => {
      if (!poa) {
        return res.status(404).send({ message: 'Довіреність не знайдено.' });
      }
      if (req.body.is_active === false) {
        Poa.update({ 
          // registrar_id: req.body.registrar_id,
          is_active: false
        }, {
          where: {
            id: req.body.id
          }
        }).then(() => {
          return res.send({ message: 'Довіреність успішно деактивовано!' });
        });
      }
      Poa.update({ 
        principal_name: req.body.principal_name,
        principal_code: req.body.principal_code,
        confident_name: req.body.confident_name,
        confident_code: req.body.confident_code,
        certification_date: req.body.certification_date,
        expiry_date: req.body.expiry_date,
        property: req.body.property,
      }, {
        where: {
          id: req.body.id
        }
      }).then(() => {
        return res.send({ message: 'Довіреність успішно оновлено!' });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
