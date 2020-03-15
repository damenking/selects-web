const express = require('express');
const axios = require('axios');
const config = require('../../../config.js');
const customerQueries = require('../../graphql/queries/customer.js');
const convertToE164 = require('../../util/phone.js');

const router = express.Router();

router.post('/create', (req, res) => {
  const { email, password, firstName, lastName, phone } = req.body;
  axios({
    url: config.shopifyStorefrontUrl,
    method: 'post',
    data: {
      query: customerQueries.createCustomer(
        email,
        password,
        firstName,
        lastName,
        convertToE164(phone)
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
        res.send({ data: { userErrors }, error: true });
      } else {
        res.send({ data: { userErrors }, error: false });
      }
    })
    .catch(response => {
      res.send({ data: { userErrors: [] }, error: true });
    });
});

router.post('/createAddress', (req, res) => {
  const {
    firstName,
    lastName,
    phone,
    company,
    address1,
    address2,
    city,
    province,
    zip,
    customerAccessToken
  } = req.body;
  axios({
    url: config.shopifyStorefrontUrl,
    method: 'post',
    data: {
      query: customerQueries.createAddress(
        firstName,
        lastName,
        phone,
        company,
        address1,
        address2,
        city,
        province,
        zip,
        customerAccessToken
      )
    },
    headers: {
      'X-Shopify-Storefront-Access-Token':
        config.SHOPIFY_STOREFRONT_ACCESS_TOKEN
    }
  })
    .then(response => {
      const userErrors =
        response.data.data.customerAddressCreate.customerUserErrors;
      if (userErrors.length > 0) {
        res.send({ data: { userErrors }, error: true });
      } else {
        res.send({ data: { userErrors }, error: false });
      }
    })
    .catch(response => {
      res.send({ data: { userErrors: [] }, error: true });
    });
});

module.exports = router;
