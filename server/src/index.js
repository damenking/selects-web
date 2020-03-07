const express = require('express');
const routes = require('./routes/');
const btaSdk = require('./bookthatapp-sdk/index.js');
const config = require('../config.js');

let btaApi = btaSdk.auth({
  key: config.BTA_KEY,
  password: config.BTA_PASSWORD
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(5000, err => {
  console.log('Server listening on port 5000');
});

module.exports = app;
