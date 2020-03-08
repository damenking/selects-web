const express = require('express');
const axios = require('axios');
const config = require('../../../config.js');
const customerQueries = require('../../graphql/queries/customer.js');

const router = express.Router();

router.post('/create', (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  axios({
    url: config.shopifyStorefrontUrl,
    method: 'post',
    data: {
      query: customerQueries.createCustomer(
        email,
        password,
        firstName,
        lastName
      )
    },
    headers: {
      'X-Shopify-Storefront-Access-Token':
        config.SHOPIFY_STOREFRONT_ACCESS_TOKEN
    }
  })
    .then(response => {
      const userErrors = response.data.data.customerCreate.userErrors;
      if (userErrors.length > 0) {
        res.send({ error: true, userErrors });
      } else {
        res.send({ error: false, userErrors });
      }
    })
    .catch(response => {
      res.send({ error: true, userErrors: [] });
    });
});

module.exports = router;
