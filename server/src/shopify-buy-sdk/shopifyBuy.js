const nodeFetch = require('node-fetch');
const Client = require('shopify-buy');
const config = require('../../config.js');

global.fetch = nodeFetch;

const shopifyClient = Client.buildClient({
  domain: 'selectsphotosupply.myshopify.com/',
  storefrontAccessToken: config.SHOPIFY_STOREFRONT_ACCESS_TOKEN
});

module.exports = {
  sdk: shopifyClient
};
