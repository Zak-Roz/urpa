const html_to_pdf = require('html-pdf-node');
const fs = require('fs');
const fse = require('fs-extra');
const { v1: uuid } = require('uuid');

exports.pdf = async (req, res) => {
  fse.emptyDirSync('C:/Users/nazar/Desktop/urpa/node-js-jwt-auth-postgresql/data/pdf');
  let options = { format: 'A4' };
  // Example of options with args //
  // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };
  const currentMonth = (new Date().getMonth() + 1) < 10 ? `0${(new Date().getMonth() + 1)}` : `${(new Date().getMonth() + 1)}`;
  const currentDay = new Date().getDate() < 10 ? `0${(new Date().getDate())}` : `${(new Date().getDate())}`;
  const currentYear = new Date().getFullYear();
  const dateNow = `${currentYear}-${currentMonth}-${currentDay}`;
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
        h3 {
            margin: 20pt;
            text-align: center;
        }
        h5 {
            margin: 20pt;
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
      <h5>Довіреність № ${req.body.id}</h5>
      <table>
          <tr>
              <td>Дата формування витягу</td>
              <td>${dateNow}</td>
          </tr>
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
              <td>ПІБ (для фізичних осіб) або Найменування (для юридичних осіб)</td>
              <td>${req.body.principal_name}</td>
          </tr>
          <tr>
              <td>РНОКПП (для фізичних осіб) або Код ЄДРПОУ (для юридичних осіб)</td>
              <td>${req.body.principal_code}</td>
          </tr>
      </table>
      <h5>Відомості про Довірену особу</h5>
      <table>
          <tr>
              <td>ПІБ (для фізичних осіб) або Найменування (для юридичних осіб)</td>
              <td>${req.body.confident_name}</td>
          </tr>
          <tr>
              <td>РНОКПП (для фізичних осіб) або Код ЄДРПОУ (для юридичних осіб)</td>
              <td>${req.body.confident_code}</td>
          </tr>
      </table>
      <h5>Відомості про Майно</h5>
      <table class="property">
          <tr>
              <td>${req.body.property}</td>
          </tr>
      </table>
  </body>
  </html>
  
` };
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