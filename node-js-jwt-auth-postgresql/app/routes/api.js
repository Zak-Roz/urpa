const router = require('express').Router();

const userRouter = require('./users');
router.use('/test', userRouter);

const authRouter = require('./auth');
router.use('/auth', authRouter);

const poaRouter = require('./poa');
router.use('/poa', poaRouter);

const workplaceRouter = require('./workplace');
router.use('/workplace', workplaceRouter);

module.exports = router;