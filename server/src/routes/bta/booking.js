const express = require('express');
const btaApi = require('../../bookthatapp-sdk/index.js');

const router = express.Router();

router.post('/new', (req, res) => {
  btaApi
    .createBooking(req.body)
    .then(response => {
      res.sendStatus(200);
    })
    .catch(error => {
      res.sendStatus(error.response.status);
    });
});

module.exports = router;
