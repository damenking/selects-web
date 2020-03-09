const express = require('express');
const btaApi = require('../../bookthatapp-sdk/');

const router = express.Router();

router.get('/availability/:btaProductId', (req, res) => {
  const dateObj = new Date();
  const formattedNow = dateObj.toISOString();
  dateObj.setMonth(dateObj.getMonth() + 1);
  const formattedNextMonth = dateObj.toISOString();
  btaApi
    .getAvailability({
      external_id: req.params.btaProductId,
      start: formattedNow,
      finish: formattedNextMonth
    })
    .then(response => {
      res.send({ data: { dates: response.data.dates }, error: false });
    })
    .catch(response => {
      res.send({ data: {}, error: true });
    });
});

module.exports = router;
