const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const cloud = require('./cloudinary');
// const { exec } = require('child-process-promise');

exports.pdf = async (req, res) => {
  try {
    // res.send(req.body.filename);
    const filename = req.body.filename;
    const pdfPath = path.join('data', 'pdf', filename + '.pdf');
    console.log('🚀 ~ file: pdf.js ~ line 11 ~ exports.pdf= ~ pdfPath', pdfPath);
    const pdfDoc = new PDFDocument();
    
    res.setHeader('Content-Disposition', 'attachment; filename="' + filename + '" ');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/pdf');
    res.status(201);
    pdfDoc.pipe(fs.createWriteStream(pdfPath));
    await pdfDoc.pipe(res);
    const content = await req.body.content;
    console.log('🚀 ~ file: pdf.js ~ line 20 ~ exports.pdf= ~ content', content);
    pdfDoc.text(content);
    pdfDoc.end();
    
    console.log('🚀 ~ file: pdf.js ~ line 24 ~ cloud.uploads ~ pdfPath', pdfPath);
    cloud.uploads(pdfPath).then((result) => {
      console.log('pdf results--', result.url);
    });
  }
  catch (err) {
    res.status(400).json({ message: 'An error occured in process' });
  }
};