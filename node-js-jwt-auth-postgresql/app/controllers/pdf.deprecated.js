const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
// const cloud = require('./cloudinary');
// const { exec } = require('child-process-promise');

exports.pdf = async (req, res) => {
  try {
    const filename = req.body.filename;
    const pdfPath = path.join('data', 'pdf', filename + '.pdf');
    const pdfDoc = new PDFDocument();
    
    res.setHeader('Content-Disposition', 'attachment; filename="' + filename + '" ');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/pdf');
    res.status(201);
    pdfDoc.pipe(fs.createWriteStream(pdfPath));
    await pdfDoc.pipe(res);
    const content = await req.body.content;
    pdfDoc.text(content);
    pdfDoc.end();
    
    // cloud.uploads(pdfPath).then((result) => {
    //   res.send(result.url);
    // }).catch((err) => {console.log(err.toString());});
  }
  catch (err) {
    res.status(400).json({ message: 'An error occured in process' });
  }
};