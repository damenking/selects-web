const express = require('express');
const axios = require('axios');
const shopifyClient = require('../../shopify-buy-sdk/shopifyBuy.js');
const config = require('../../../config.js');
const checkoutQueries = require('../../graphql/queries/checkout.js');

const router = express.Router();

router.post('/create', (req, res) => {
  const { email, shippingAddress } = req.body;
  shippingAddress.country = 'United States';
  shopifyClient.sdk.checkout
    .create({ email, shippingAddress })
    .then(response => {
      res.send({ data: { checkoutId: response.id }, error: false });
    })
    .catch(response => {
      res.send({ data: { checkoutId: '' }, error: true });
    });
});

router.get('/fetch', (req, res) => {
  const { checkoutId } = req.query;
  shopifyClient.sdk.checkout
    .fetch(checkoutId)
    .then(response => {
      const { lineItems, webUrl } = response;
      res.send({
        data: {
          webUrl,
          lineItems
        },
        error: false
      });
    })
    .catch(response => {
      res.send({ data: {}, error: true });
    });
});

router.post('/addlineitems', (req, res) => {
  const { checkoutId, lineItems } = req.body;
  shopifyClient.sdk.checkout
    .addLineItems(checkoutId, lineItems)
    .then(response => {
      res.send({ error: false });
    })
    .catch(response => {
      res.send({ error: true });
    });
});

router.post('/removelineitems', (req, res) => {
  const { checkoutId, lineItems } = req.body;
  shopifyClient.sdk.checkout
    .removeLineItems(checkoutId, lineItems)
    .then(response => {
      const { lineItems } = response;
      res.send({ data: { lineItems }, error: false });
    })
    .catch(response => {
      res.send({ data: {}, error: true });
    });
});

router.post('/delete', (req, res) => {
  // This is a workaround for not being able to
  // modify a checkout with a non-sales channel app.
  // Needs more testing and need to add pricing var.
  // If not this then some other solution needs to
  // be in place otherwise I believe abandoned checkouts
  // will pile up for on account orders.
  const { checkoutId } = req.body;
  axios({
    url: config.shopifyStorefrontUrl,
    method: 'post',
    data: {
      query: checkoutQueries.deleteCheckout(checkoutId)
    },
    headers: {
      'X-Shopify-Storefront-Access-Token':
        config.SHOPIFY_STOREFRONT_ACCESS_TOKEN
    }
  })
    .then(response => {
      res.send({ error: false });
    })
    .catch(response => {
      res.send({ error: true });
    });
});

router.post('/updateshippingline', (req, res) => {
  // Needs to be done before delete step to 'complete' a checkout
  const { checkoutId } = req.body;
  axios({
    url: config.shopifyStorefrontUrl,
    method: 'post',
    data: {
      query: checkoutQueries.updateShippingLine(checkoutId, 'Standard')
    },
    headers: {
      'X-Shopify-Storefront-Access-Token':
        config.SHOPIFY_STOREFRONT_ACCESS_TOKEN
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
