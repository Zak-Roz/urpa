const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./app/routes/api');

const app = express();

const corsOptions = {
  origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require('./app/models');

db.sequelize.sync();


//
// force: true will drop the table if it already exists
const Right = db.right;
function initialRight() {
  Right.create({ id: 1, name: 'user' });
  Right.create({ id: 2, name: 'moderator' });
  Right.create({ id: 3, name: 'admin' });
}
const Status = db.status;
function initialStatus() {
  Status.create({ id: 1, account_status: 'noactivity' });
  Status.create({ id: 2, account_status: 'active' });
  Status.create({ id: 3, account_status: 'rejection' });
}
const Workplace = db.workplace;
function initialWorkplace() {
  Workplace.create({ email: 'a', organization_name: 'a' });
  Workplace.create({ email: 'ab', organization_name: 'ab' });
  Workplace.create({ email: 'abc', organization_name: 'abc' });
}
 db.sequelize.sync({ force: true }).then(() => {
   console.log('\n\nDrop and Resync Database with { force: true }\n\n');
   initialRight();
   initialStatus();
   initialWorkplace();
 });
//


// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to zak-roz application.' });
});

// routes
app.use('/api', apiRouter);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}.`);
});