const express = require('express');
const btaApi = require('../../bookthatapp-sdk/index.js');

const router = express.Router();

router.post('/create', (req, res) => {
  btaApi
    .createBooking(req.body)
    .then(response => {
      res.send({ error: false });
    })
    .catch(response => {
      res.send({ error: true });
    });
});

module.exports = router;
