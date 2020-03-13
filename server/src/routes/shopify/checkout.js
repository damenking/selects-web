const express = require('express');
const shopifyClient = require('../../shopify-buy-sdk/shopifyBuy.js');

const router = express.Router();

router.post('/create', (req, res) => {
  // Create an empty checkout
  shopifyClient.sdk.checkout.create().then(checkout => {
    // Do something with the checkout
    console.log(checkout);
  });
});
