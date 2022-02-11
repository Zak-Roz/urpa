const html_to_pdf = require('html-pdf-node');
const fs = require('fs');
const fse = require('fs-extra');
const { v1: uuid } = require('uuid');

exports.pdf = async (req, res) => {
  // console.log('🚀 ~ file: pdf.controller.js ~ line 8 ~ exports.pdf= ~ req.body', req.body);
  fse.emptyDirSync('C:/Users/SOFTPRO-310-10/Desktop/urpa/urpa/node-js-jwt-auth-postgresql/data/pdf');
  let options = { format: 'A4' };
  // Example of options with args //
  // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };
  const currentMonth = (new Date().getMonth() + 1) < 10 ? `0${(new Date().getMonth() + 1)}` : `${(new Date().getMonth() + 1)}`;
  const currentDay = new Date().getDate() < 10 ? `0${(new Date().getDate())}` : `${(new Date().getDate())}`;
  const currentYear = new Date().getFullYear();
  const dateNow = `${currentDay}-${currentMonth}-${currentYear}`;
  req.body.registration_date = req.body.registration_date.split('-').reverse().join('-');
  req.body.expiry_date = req.body.expiry_date.split('-').reverse().join('-');
  req.body.certification_date = req.body.certification_date.split('-').reverse().join('-');
  let confidentName, confidentCode, principalName, principalCode;
  if (req.body.confident_code.length === 8) {
    confidentName = 'Найменування юридичної осіби';
    confidentCode = 'Код ЄДРПОУ';
  }
  else {
    confidentName = 'ПІБ фізичної осіби';
    confidentCode = 'РНОКПП (ІПН)';
  } 
  if (req.body.principal_code.length === 8) {
    principalName = 'Найменування юридичної осіби';
    principalCode = 'Код ЄДРПОУ';
  }
  else {
    principalName = 'ПІБ фізичної осіби';
    principalCode = 'РНОКПП (ІПН)';
  } 
  let file = { content: `
  <html>
  <head>
      <title>Витяг</title>
      <style>
        body {
          background-color: white;
          font-family: 'Times New Roman', Times, serif;
          padding-top: 10pt;
        }
        h3, h4, h5, h2 {
            margin: 10pt;
            text-align: center;
        }
        p {
          text-align: center;
        }
        table {
            border: none;
            padding: 0 50pt;
            table-layout: fixed;
            width: 100%;
        }
        table td {
            width: 50%;
        }
        table.property td {
            padding-bottom: 30pt;
            text-align: center;
            width: 100%;
        }
      </style>
  </head>
  <body>
      <h3>ВИТЯГ <br> з Єдиного Реєстру Довіреностей</h3>
      <h4>Довіреність № ${req.body.id}</h4>
      <p>${req.body.is_active ? 'Активна' : 'Не активна'}</p>
      <p>${req.body.is_duplicate ? 'Дублікат' : ''}</p>
      <table width="100%" cellpadding="5">
          <tr>
              <td>Серія спеціального бланку нотаріальних документів, на якому викладено текст довіреності</td>
              <td>${req.body.blank_series}</td>
          </tr>
          <tr>
              <td>Номер спеціального бланку нотаріальних документів, на якому викладено текст довіреності</td>
              <td>${req.body.blank_number}</td>
          </tr>
          <tr>
              <td>Дата реєстрації довіреності у реєстрі</td>
              <td>${req.body.registration_date}</td>
          </tr>
          <tr>
              <td>Дата посвідчення довіреності</td>
              <td>${req.body.certification_date}</td>
          </tr>
          <tr>
              <td>Строк (термін) дії довіреності</td>
              <td>${req.body.expiry_date}</td>
          </tr>
      </table>
      <h5>Відомості про Довірителя</h5>
      <table>
          <tr>
              <td>${principalName}</td>
              <td>${req.body.principal_name}</td>
          </tr>
          <tr>
              <td>${principalCode}</td>
              <td>${req.body.principal_code}</td>
          </tr>
      </table>
      <h5>Відомості про Довірену особу</h5>
      <table>
          <tr>
              <td>${confidentName}</td>
              <td>${req.body.confident_name}</td>
          </tr>
          <tr>
              <td>${confidentCode}</td>
              <td>${req.body.confident_code}</td>
          </tr>
      </table>
      <h5>Відомості про Майно</h5>
      <table class="property">
          <tr>
              <td>${req.body.property}</td>
          </tr>
      </table>
      <p style="margin: 40px 0px 0 550px">Дата формування витягу</p>
      <p style="margin: 5px 0px 0 550px">${dateNow}</p>
  </body>
  </html>
  
` };
  // let file = { url: "http://localhost:8081/user/2" };
  try {
    const pdfBuffer = await html_to_pdf.generatePdf(file, options); //.then(pdfBuffer => {
    console.log('PDF Buffer:-', pdfBuffer);
    const fileName = `${uuid()}.pdf`;
    const fileURL = `C:/Users/SOFTPRO-310-10/Desktop/urpa/urpa/node-js-jwt-auth-postgresql/data/pdf/${fileName}`;
    fs.writeFileSync(fileURL, pdfBuffer);
    console.log('🚀 ~ file: pdf.controller.js ~ line 230 ~ pdfBuffer ~ ', fileURL);
    const stream = fs.createReadStream(fileURL);
    res.set({
      'Content-Disposition': `attachment; filename='${fileName}'`,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/pdf',
    });
    stream.pipe(res);
    // return res.send('Файл надіслано');
  }catch (err) {
    res.status(400).json({ message: err.toString() });
  }
};