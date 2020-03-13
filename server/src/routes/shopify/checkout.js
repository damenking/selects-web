const express = require('express');
const shopifyClient = require('../../shopify-buy-sdk/shopifyBuy.js');

const router = express.Router();

router.post('/create', (req, res) => {
  shopifyClient.sdk.checkout
    .create()
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
    .then(checkout => {
      const { id, email, lineItems, webUrl } = checkout;
      res.send({
        data: {
          id,
          email,
          lineItems,
          webUrl
        },
        error: false
      });
    })
    .catch(response => {
      res.send({ data: {}, error: true });
    });
});

router.post('/addlineitem', (req, res) => {
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
module.exports = router;
