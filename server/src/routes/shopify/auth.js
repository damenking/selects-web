const express = require('express');
const axios = require('axios');
const config = require('../../../config.js');
const {
  createCustomerAccessToken,
  getCustomerByCustomerAccessToken,
  renewCustomerAccessToken,
  triggerPasswordReset,
  passwordResetByUrl,
} = require('../../graphql/queries/auth.js');
const {
  getNumericProductId,
  getIdFromBase64,
} = require('../../util/shopify.js');

const router = express.Router();

router.post('/signin', (req, res) => {
  const { email, password } = req.body;
  axios({
    url: config.shopifyStorefrontUrl,
    method: 'post',
    data: {
      query: createCustomerAccessToken(email, password),
    },
    headers: {
      'X-Shopify-Storefront-Access-Token':
        config.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
  })
    .then((response) => {
      const {
        customerUserErrors,
        customerAccessToken,
      } = response.data.data.customerAccessTokenCreate;
      if (customerUserErrors.length > 0) {
        res.send({
          data: { userErrors: customerUserErrors, accessToken: '' },
          error: true,
        });
      } else {
        res.send({
          data: {
            userErrors: customerUserErrors,
            accessToken: customerAccessToken.accessToken,
          },
          error: false,
        });
      }
    })
    .catch((response) => {
      res.send({
        data: {
          userErrors: [],
          accessToken: '',
        },
        error: true,
      });
    });
});

router.get('/checktoken', (req, res) => {
  const { token } = req.query;
  axios({
    url: config.shopifyStorefrontUrl,
    method: 'post',
    data: {
      query: getCustomerByCustomerAccessToken(token),
    },
    headers: {
      'X-Shopify-Storefront-Access-Token':
        config.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
  })
    .then((response) => {
      const { customer } = response.data.data;
      customer.id = getNumericProductId(getIdFromBase64(customer.id));
      const customerPromise = async (customerId) => {
        return axios({
          url: `${config.shopifyAdminRestUrlWithAuth}customers/${customerId}.json`,
          method: 'get',
        });
      };
      const metaFieldPromise = async (customerId) => {
        return axios({
          url: `${config.shopifyAdminRestUrlWithAuth}customers/${customerId}/metafields.json`,
          method: 'get',
        });
      };
      Promise.all([customerPromise(customer.id), metaFieldPromise(customer.id)])
        .then((responses) => {
          const customer = responses[0].data.customer;
          const metaFields = responses[1].data.metafields;
          const favorites = { product: {} };
          metaFields.forEach((metaField) => {
            if (metaField.key === 'product') {
              favorites.product = JSON.parse(metaField.value);
            }
          });
          res.send({
            data: { user: customer, favorites, activeToken: true },
            error: false,
          });
        })
        .catch((response) => {
          res.send({
            data: { user: {}, favorites: {}, activeToken: true },
            error: true,
          });
        });
    })
    .catch((response) => {
      res.send({
        data: { user: {}, favorites: {}, activeToken: false },
        error: true,
      });
    });
});

router.post('/renewtoken', (req, res) => {
  const { customerAccessToken } = req.body;
  axios({
    url: config.shopifyStorefrontUrl,
    method: 'post',
    data: {
      query: renewCustomerAccessToken(customerAccessToken),
    },
    headers: {
      'X-Shopify-Storefront-Access-Token':
        config.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
  })
    .then((response) => {
      const {
        customerAccessToken,
        userErrors,
      } = response.data.data.customerAccessTokenRenew;
      if (userErrors.length > 0) {
        res.send({
          data: { userErrors, renewedToken: '', expiresAt: '' },
          error: true,
        });
      } else {
        res.send({
          data: {
            userErrors,
            renewedToken: customerAccessToken.accessToken,
            expiresAt: customerAccessToken.expiresAt,
          },
          error: false,
        });
      }
    })
    .catch((response) => {
      res.send({
        data: {
          userErrors: [],
          renewedToken: '',
          expiresAt: '',
        },
        error: true,
      });
    });
});

router.post('/resetpassword', (req, res) => {
  const { email } = req.body;
  axios({
    url: config.shopifyStorefrontUrl,
    method: 'post',
    data: {
      query: triggerPasswordReset(email),
    },
    headers: {
      'X-Shopify-Storefront-Access-Token':
        config.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
  })
    .then((response) => {
      res.send({ error: false });
    })
    .catch((response) => {
      res.send({ error: true });
    });
});

router.post('/updatepassword', (req, res) => {
  const { url, newPassword } = req.body;
  axios({
    url: config.shopifyStorefrontUrl,
    method: 'post',
    data: {
      query: passwordResetByUrl(url, newPassword),
    },
    headers: {
      'X-Shopify-Storefront-Access-Token':
        config.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
  })
    .then((response) => {
      const { customerResetByUrl } = response.data.data;
      const customerAccessToken =
        customerResetByUrl.customerAccessToken.accessToken;
      const customerUserErrors = customerResetByUrl.customerUserErrors;
      if (customerUserErrors.length) {
        const formattedErrors = customerUserErrors.map((error) => {
          return error.message;
        });
        res.send({
          data: { customerUserErrors: formattedErrors },
          error: true,
        });
      }

      res.send({
        data: { customerAccessToken, customerUserErrors: [] },
        error: false,
      });
    })
    .catch((response) => {
      res.send({
        data: { customerAccessToken: '', customerUserErrors: [] },
        error: true,
      });
    });
});

module.exports = router;
