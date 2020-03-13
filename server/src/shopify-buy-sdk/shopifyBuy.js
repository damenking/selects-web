const config = require('../../config.js');

const shopifyClient = Client.buildClient({
  domain: 'https://selectsphotosupply.myshopify.com/',
  storefrontAccessToken: config.SHOPIFY_STOREFRONT_ACCESS_TOKEN
});

module.exports = {
  sdk: shopifyClient
};
