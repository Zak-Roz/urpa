const db = require('../models');
const RIGHTS = db.RIGHTS;
const User = db.user;
const Workplace = db.workplace;

const checkDuplicateUser = (req, res, next) => {
  try {
  // Login
    // console.log(req.body);
    if (req.body.status_id === 3) next();
    // console.log('🚀 ~ file: verifyUser.js ~ line 11 ~ checkDuplicateUser ~ req.body', req.body);
    User.findByPk(req.body.id)
      .then(user => {
        console.log('🚀 ~ file: verifyUser.js ~ line 13 ~ checkDuplicateUser ~ user', user);
        // return;
        // all
        if (user.fullname === req.body.fullname 
          && user.login === req.body.login
          && user.dob === req.body.dob
          && user.rntrc === req.body.rntrc
          && user.passport_issue_date === req.body.passport_issue_date
          && user.passport_serias === req.body.passport_serias
          && user.passport_number === req.body.passport_number
          && user.passport_authority === req.body.passport_authority)
        {
          try {
            if (req.body.rights?.length) {
              req.body.rights = req.body.rights.filter((el) => el);
              console.log('🚀 ~ file: verifyUser.js ~ line 28 ~ checkDuplicateUser ~ req.body.rights', req.body.rights);
              for (let i = 0; i < req.body.rights.length; i++) {
                if (!RIGHTS.includes(req.body.rights[i])) {
                  return res.status(400).send({
                    message: 'Помилка! Не існує таких прав доступу: ' + req.body.rights[i]
                  });
                }
              }
              Workplace.findOne({
                where: {
                  organization_name: req.body.organization_name
                }})
                .then(work => {
                  if (work && work.id === user.workplace_id) {
                    req.body.workplace_id = work.id;
                    
                    user.getRights().then(rights => {
                      const rightsBuff =[];
                      // console.log('🚀 ~ file: verifyUser.js ~ line 44 ~ user.getRights ~ rights', rights);
                      // return res.status(400).send({message: 'Stop'});
                      // console.log('🚀 ~ file: verifyUser.js ~ line 49 ~ user.getRights ~ rights', rights);
                      // return res.status(400).send({message: 'Stop'});
                      let flag = false;
                      rights.forEach((i) => rightsBuff.push(i.name));
                      req.body.rights.sort();
                      rightsBuff.sort();
                      if (rightsBuff.length === req.body.rights.length) {
                        for (let i = 0; i < rights.length; i++) {
                          // rightsBuff.push(rights[i].name);
                          if (rightsBuff[i] !== req.body.rights[i]) flag = true;
                        }
                        // console.log('🚀 ~ file: verifyUser.js ~ line 54 ~ user.getRights ~ flag', flag);
                        // console.log('🚀 ~ file: verifyUser.js ~ line 54 ~ user.getRights ~ req.body.rights', req.body.rights);
                        // console.log('🚀 ~ file: verifyUser.js ~ line 54 ~ user.getRights ~ rightsBuff', rightsBuff);
                        // return res.status(400).send({message: 'Stop'});
                        if (!flag) {
                          return res.status(400).send({message: 'Зміни не внесені. Змініть щось, щоб оновити дані!'});
                        }
                        else {
                          next();
                        }
                      }
                    }).catch(err => {
                      return res.status(500).send({ message: err.message });
                    });
                  }
                  
                }).catch(err => {
                  return res.status(500).send({ message: err.message });
                });
              
            } 
            else return res.status(400).send({message: 'Помилка! Змінення ролі неможливе. Виберіть принаймні одну з перерахованих ролей!'});

            next();
          } catch (err) {
            res.status(500).send({ message: 'Перевірка на користувача завалилася, сервер verifyUser 35' });
          }
        }
        // else {

        // }
        Workplace.findOne({
          where: {
            organization_name: req.body.organization_name
          }})
          .then(work => {
            if (!work) {
              return res.status(400).send({
                message: 'Місце роботи не знайдено. Виберіть іншу або створіть нову!',
              });
            }
            req.body.workplace_id = work.id;
            next();
          }).catch(err => {
            return res.status(500).send({ message: err.message });
          });
      }).catch(err => {
        return res.status(500).send({ message: err.message });
      });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const verifyUser = {
  checkDuplicateUser,
};

module.exports = verifyUser;
