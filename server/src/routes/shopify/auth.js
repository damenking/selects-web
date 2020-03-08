const express = require('express');
const axios = require('axios');
const config = require('../../../config.js');
const authQueries = require('../../graphql/queries/auth.js');

const router = express.Router();

router.post('/signin', (req, res) => {
  const { email, password } = req.body;
  axios({
    url: config.shopifyStorefrontUrl,
    method: 'post',
    data: {
      query: authQueries.createCustomerAccessToken(email, password)
    },
    headers: {
      'X-Shopify-Storefront-Access-Token':
        config.SHOPIFY_STOREFRONT_ACCESS_TOKEN
    }
  })
    .then(response => {
      const {
        customerUserErrors,
        customerAccessToken
      } = response.data.data.customerAccessTokenCreate;
      if (customerUserErrors.length > 0) {
        res.send({ error: true, userErrors: customerUserErrors });
      } else {
        res.send({
          error: false,
          userErrors: customerUserErrors,
          accessToken: customerAccessToken.accessToken
        });
      }
    })
    .catch(response => {
      res.send({ error: true, userErrors: [] });
    });
});

router.get('/checktoken', (req, res) => {
  const { email, token } = req.query;
  console.log('*********');
  console.log(req.query);
  axios({
    url: config.shopifyStorefrontUrl,
    method: 'post',
    data: {
      query: authQueries.checkCustomerAccessToken(token)
    },
    headers: {
      'X-Shopify-Storefront-Access-Token':
        config.SHOPIFY_STOREFRONT_ACCESS_TOKEN
    }
  })
    .then(response => {
      console.log('a');
      console.log(response.data);
    })
    .catch(response => {
      console.log('b');
      console.log(response);
    });
});

module.exports = router;
