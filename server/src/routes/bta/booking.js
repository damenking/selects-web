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

router.post('/reservation/createandconfirm', (req, res) => {
  // This approach makes it so bta will automatically create different
  // bookings for different start/end dates without having to worry
  // about create multiple bookings ourselves.  After confirming
  // the reservation gets deleted because that does not automatically happen.
  // May or may not use this approach depending on business rules.
  const {
    firstName,
    lastName,
    email,
    reservationLineItems,
    cartToken
  } = req.body;
  btaApi
    .createReservation({
      cartToken,
      items: reservationLineItems,
      guests: [
        {
          firstName,
          lastName,
          email
        }
      ]
    })
    .then(function(response) {
      const reservationId = response.data.reservation.id;
      btaApi
        .confirmReservation({ id: reservationId })
        .then(response => {
          btaApi.deleteReservation({ id: reservationId });
          res.send({ error: false });
        })
        .catch(response => {
          res.send({ error: true });
        });
    })
    .catch(function(response) {
      res.send({ error: true });
    });
});

module.exports = router;
