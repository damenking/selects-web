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
        res.send({
          data: { userErrors: customerUserErrors, accessToken: '' },
          error: true
        });
      } else {
        res.send({
          data: {
            userErrors: customerUserErrors,
            accessToken: customerAccessToken.accessToken
          },
          error: false
        });
      }
    })
    .catch(response => {
      res.send({
        data: {
          userErrors: [],
          accessToken: ''
        },
        error: true
      });
    });
});

router.get('/checktoken', (req, res) => {
  const { token } = req.query;
  axios({
    url: config.shopifyStorefrontUrl,
    method: 'post',
    data: {
      query: authQueries.getCustomerByCustomerAccessToken(token)
    },
    headers: {
      'X-Shopify-Storefront-Access-Token':
        config.SHOPIFY_STOREFRONT_ACCESS_TOKEN
    }
  })
    .then(response => {
      try {
        const { customer } = response.data.data;
        res.send({ data: { user: customer, activeToken: true }, error: false });
      } catch (error) {
        res.send({ data: { user: {}, activeToken: false }, error: false });
      }
    })
    .catch(response => {
      res.send({ data: { user: {}, activeToken: false }, error: true });
    });
});

router.post('/renewtoken', (req, res) => {
  const { customerAccessToken } = req.body;
  axios({
    url: config.shopifyStorefrontUrl,
    method: 'post',
    data: {
      query: authQueries.renewCustomerAccessToken(customerAccessToken)
    },
    headers: {
      'X-Shopify-Storefront-Access-Token':
        config.SHOPIFY_STOREFRONT_ACCESS_TOKEN
    }
  })
    .then(response => {
      const {
        accessToken,
        expiresAt,
        userErrors
      } = response.data.data.customerAccessTokenRenew;
      if (userErrors.length > 0) {
        res.send({
          data: { userErrors, accessToken: '', expiresAt: '' },
          error: true
        });
      } else {
        res.send({
          data: {
            userErrors,
            accessToken: accessToken,
            expiresAt
          },
          error: false
        });
      }
    })
    .catch(response => {
      res.send({
        data: {
          userErrors: [],
          accessToken: ''
        },
        error: true
      });
    });
});

module.exports = router;
