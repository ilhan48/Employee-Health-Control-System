const express = require('express');
const cors = require('cors');

const app = express();

const index = require('./routes/index');
const employeeRoute = require('./routes/employee.routes');
const covidRoute = require('./routes/covid.routes');
const healthSituationRoute = require('./routes/healthSituation.routes');
const prescriptionRoute = require('./routes/prescription.routes');
const vaccineRoute = require('./routes/vaccine.routes');
const workHoursRoute = require('./routes/workHours.routes');

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.json({type: 'application/vnd.api+json'}));
app.use(cors());

app.use(index);
app.use('/api', covidRoute);
app.use('/api', healthSituationRoute);
app.use('/api', prescriptionRoute);
app.use('/api', vaccineRoute);
app.use('/api', employeeRoute);
app.use('/api', workHoursRoute);


module.exports = app;
