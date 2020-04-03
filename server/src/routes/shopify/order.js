const express = require('express');
const axios = require('axios');
const config = require('../../../config.js');

const router = express.Router();

router.post('/create', (req, res) => {
  const { lineItems, email } = req.body;
  axios({
    url: config.shopifyAdminRestUrl + 'orders.json',
    method: 'post',
    data: {
      order: {
        email,
        line_items: lineItems
      }
    },
    headers: {
      'X-Shopify-Access-Token': config.SHOPIFY_ADMIN_API_PASSWORD
    }
  })
    .then(response => {
      res.send({ error: false });
    })
    .catch(response => {
      res.send({ error: true });
    });
});

module.exports = router;
