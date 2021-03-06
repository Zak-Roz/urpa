const { authJwt } = require('../middleware');
const { verifyUser } = require('../middleware');

const controller = require('../controllers/user.controller');
// const myError = require('./../myError');
const userRouter = require('express').Router();

userRouter
  .use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  })
  .get('/all', controller.allAccess)
  .get('/allUsers', controller.allUsers)
  .get('/findUser', controller.findUser)
  .get('/getById', controller.getById)
  .put('/updatePass',controller.updatePass)
  .put('/update',
    [verifyUser.checkDuplicateUser],
    controller.update)
  .get('/user',[authJwt.verifyToken],controller.userBoard)
  .get('/mod',[authJwt.verifyToken, authJwt.isModerator],controller.moderatorBoard)
  .get('/admin',[authJwt.verifyToken, authJwt.isAdmin],controller.adminBoard);

userRouter.use(() => {
  // throw new myError(400, 'Команду не знайдено');
});

module.exports = userRouter;