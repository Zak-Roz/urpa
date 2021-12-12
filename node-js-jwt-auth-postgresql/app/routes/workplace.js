const { verifyWorkplace } = require('../middleware');
const controller = require('../controllers/workplace.controller');
// const myError = require('./../myError');
const workplaceRouter = require('express').Router();

workplaceRouter
  .use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  })
  .get('/getByName', controller.getByName)
  .get('/getAll', controller.getAll)
  .get('/getById', controller.getById)
  .post('/new',
    [
      verifyWorkplace.checkDuplicateEmailOrName,
    ], 
    controller.create
  );

workplaceRouter.use(() => {
  // throw new myError(400, 'Команду не знайдено');
});

module.exports = workplaceRouter;