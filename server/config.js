let SHOPIFY_ADMIN_API_PASSWORD = '';
let BTA_KEY = '';
let BTA_PASSWORD = '';

if (process.env.NODE_ENV === 'development') {
  const config = require('./localsettings.json');
  SHOPIFY_ADMIN_API_PASSWORD = config.SHOPIFY_ADMIN_API_PASSWORD;
  BTA_KEY = config.BTA_KEY;
  BTA_PASSWORD = config.BTA_PASSWORD;
} else if (process.env.NODE_ENV === 'production') {
  SHOPIFY_ADMIN_API_PASSWORD = process.env.SHOPIFY_ADMIN_API_PASSWORD;
  BTA_KEY = process.env.BTA_KEY;
  BTA_PASSWORD = process.env.BTA_PASSWORD;
}

module.exports = {
  SHOPIFY_ADMIN_API_PASSWORD,
  BTA_KEY,
  BTA_PASSWORD,
  shopifyUrl:
    'https://selectsphotosupply.myshopify.com/admin/api/2020-01/graphql.json'
};
