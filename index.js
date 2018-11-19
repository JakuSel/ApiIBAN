const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const iban = require('./api/prevod/iban');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/prevod',iban);



module.exports = app;