const express = require('express');
const btaApi = require('../../bookthatapp-sdk/index.js');

const router = express.Router();

router.post('/create', (req, res) => {
  btaApi
    .createBooking(req.body)
    .then(response => {
      res.send({ data: {}, error: false });
    })
    .catch(response => {
      res.send({ data: {}, error: true });
    });
});

module.exports = router;
