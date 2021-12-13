const authJwt = require('./authJwt');
const verifySignUp = require('./verifySignUp');
const verifyPoa = require('./verifyPoa');
const verifyWorkplace = require('./verifyWorkplace');
const verifyUser = require('./verifyUser');

module.exports = {
  authJwt,
  verifySignUp,
  verifyPoa,
  verifyWorkplace,
  verifyUser
};