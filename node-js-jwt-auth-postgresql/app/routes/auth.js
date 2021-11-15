const { verifySignUp } = require('../middleware');
const controller = require('../controllers/auth.controller');
const authRouter = require('express').Router();

authRouter
  .use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  })
  .post(
    '/signup',
    [
      verifySignUp.checkDuplicateUser,
      verifySignUp.checkRightsExisted,
      verifySignUp.checkWorkplaceExisted
    ],
    controller.signup
  )
  .post('/signin', controller.signin);

authRouter.use(() => {
  // throw new myError(400, 'command not found');
});

module.exports = authRouter;