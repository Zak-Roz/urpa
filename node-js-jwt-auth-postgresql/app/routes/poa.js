const { verifyPoa } = require('../middleware');
const controller = require('../controllers/poa.controller');
// const myError = require('./../myError');
const poaRouter = require('express').Router();

poaRouter
  .use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  })
  .get('/getOne', controller.getOne)
  .get('/getById', controller.getById)
  .post('/new',
    [
      verifyPoa.checkDuplicateBlank_SAN,
      verifyPoa.checkDuplicateAll,
      verifyPoa.checkUsersExisted,
    ],
    controller.create
  );

poaRouter.use(() => {
  // throw new myError(400, 'Команду не знайдено');
});

module.exports = poaRouter;