const cors = require('cors');
const pdfController = require('../controllers/pdf.controller');
// const myError = require('./../myError');
const pdfRouter = require('express').Router();

pdfRouter.post('/addNewPdf',
  cors({
    exposedHeaders: ['Content-Disposition'],
  }),
  pdfController.pdf);

// pdfRouter.use(() => {
//   // throw new myError(400, 'Команду не знайдено');
// });

module.exports = pdfRouter;