const html_to_pdf = require('html-pdf-node');
const fs = require('fs');
const fse = require('fs-extra');
const { v1: uuid } = require('uuid');

exports.pdf = async (req, res) => {
  fse.emptyDirSync('C:/Users/nazar/Desktop/urpa/node-js-jwt-auth-postgresql/data/pdf');
  let options = { format: 'A4' };
  // Example of options with args //
  // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

  let file = { content: `
<h5 id="commonHeader" class="hide-on-print">Company Name</h5>
<select class="dropDownIndent" id="outlet" name="outlet">
<option>XYZ</option>
</select>
<div class="col-lg-4 col-4">
<h5 id="commonHeader">${req.body.name}</h5>` };
  // let file = { url: "http://localhost:8081/user/2" };
  try {
    const pdfBuffer = await html_to_pdf.generatePdf(file, options); //.then(pdfBuffer => {
    console.log('PDF Buffer:-', pdfBuffer);
    const fileName = `C:/Users/nazar/Desktop/urpa/node-js-jwt-auth-postgresql/data/pdf/${uuid()}.pdf`;
    fs.writeFileSync(fileName, pdfBuffer);
    console.log('🚀 ~ file: pdf.controller.js ~ line 230 ~ pdfBuffer ~ ', fileName);
    res.send(fileName);
  }catch (err) {
    res.status(400).json({ message: err.toString() });
  }
};