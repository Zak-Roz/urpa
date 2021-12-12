const pdfController = require('../controllers/pdf.controller');
// const myError = require('./../myError');
const pdfRouter = require('express').Router();

pdfRouter.post('/addNewPdf', pdfController.pdf);

// pdfRouter.use(() => {
//   // throw new myError(400, 'Команду не знайдено');
// });

module.exports = pdfRouter;