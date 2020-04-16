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
      ),
    },
    headers: {
      'X-Shopify-Storefront-Access-Token':
        config.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
  })
    .then((response) => {
      const userErrors = response.data.data.customerCreate.userErrors;
      if (userErrors.length > 0) {
        res.send({ data: { userErrors }, error: true });
      } else {
        res.send({ data: { userErrors }, error: false });
      }
    })
    .catch((response) => {
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
    customerAccessToken,
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
      ),
    },
    headers: {
      'X-Shopify-Storefront-Access-Token':
        config.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
  })
    .then((response) => {
      const userErrors =
        response.data.data.customerAddressCreate.customerUserErrors;
      if (userErrors.length > 0) {
        res.send({ data: { userErrors }, error: true });
      } else {
        res.send({ data: { userErrors }, error: false });
      }
    })
    .catch((response) => {
      res.send({ data: { userErrors: [] }, error: true });
    });
});

router.get('/:customerId/metafields/favorites', (req, res) => {
  const customerId = req.params.customerId;
  axios({
    url: `${config.shopifyAdminRestUrlWithAuth}customers/${customerId}/metafields.json`,
    method: 'get',
  })
    .then((response) => {
      const metaFields = response.data.metafields;
      let productFavorites = [];
      metaFields.forEach((metaField) => {
        if (metaField.key === 'product') {
          productFavorites = JSON.parse(metaField.value);
        }
      });
      res.send({ data: { favorites: productFavorites }, error: false });
    })
    .catch((response) => {
      res.send({ data: { favorites: [] }, error: true });
    });
});

router.post('/:customerId/metafields/updatefavorites', (req, res) => {
  // /admin/api/2020-04/customers/#{customer_id}.json
  const customerId = req.params.customerId;
  const { favoriteIds } = req.body;
  const reqObj = {
    metafield: {
      namespace: 'favorites',
      key: 'product',
      value_type: 'json_string',
      value: JSON.stringify(favoriteIds),
    },
  };
  axios({
    url: `${config.shopifyAdminRestUrlWithAuth}customers/${customerId}/metafields.json`,
    method: 'post',
    data: reqObj,
  })
    .then((response) => {
      res.send({ error: false });
    })
    .catch((response) => {
      res.send({ error: true });
    });
});
module.exports = router;
