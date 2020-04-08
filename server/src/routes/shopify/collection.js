const express = require('express');
const axios = require('axios');
const config = require('../../../config.js');
const collectionQueries = require('../../graphql/queries/collection.js');

const router = express.Router();

router.get('/:collectionHandle', (req, res) => {
  const collectionHandle = req.params.collectionHandle;

  axios({
    url: config.shopifyAdminUrl,
    method: 'post',
    data: {
      query: collectionQueries.collectionByHandleQuery(collectionHandle),
    },
    headers: {
      'X-Shopify-Access-Token': config.SHOPIFY_ADMIN_API_PASSWORD,
    },
  })
    .then((response) => {
      const collection = response.data.data.collectionByHandle;
      res.send({ data: { collection }, error: false });
    })
    .catch((response) => {
      res.send({ data: {}, error: true });
    });
});

router.get('/menu/:collectionHandle', (req, res) => {
  const collectionHandle = req.params.collectionHandle;

  axios({
    url: config.shopifyStorefrontUrl,
    method: 'post',
    data: {
      query: collectionQueries.menuCollectionByHandleQuery(collectionHandle),
    },
    headers: {
      'X-Shopify-Storefront-Access-Token':
        config.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
  })
    .then((response) => {
      const options = JSON.parse(
        response.data.data.collectionByHandle.description
      ).options;
      res.send({ data: { options }, error: false });
    })
    .catch((response) => {
      res.send({ data: {}, error: true });
    });
});

module.exports = router;
