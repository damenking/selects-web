const express = require('express');
const axios = require('axios');
const config = require('../../../config.js');
const productsQueries = require('../../queries/products.js');
const getNumericProductId = require('../../util/shopify.js');

const router = express.Router();

router.get('/:productHandle', (req, res) => {
  const productHandle = req.params.productHandle;
  axios({
    url: config.shopifyUrl,
    method: 'post',
    data: {
      query: productsQueries.productByHandleQuery(productHandle)
    },
    headers: {
      'X-Shopify-Access-Token': config.SHOPIFY_ADMIN_API_PASSWORD
    }
  })
    .then(result => {
      try {
        const formattedResponse = { data: {}, error: false };
        const data = result.data.data.productByHandle;
        formattedResponse.data = data;
        formattedResponse.data.variantIds = [];
        formattedResponse.data.id = getNumericProductId(
          formattedResponse.data.id
        );
        formattedResponse.data.primaryVariantId = getNumericProductId(
          data.variants.edges[0].node.id
        );
        formattedResponse.data.price = data.priceRange.maxVariantPrice.amount;
        res.send(formattedResponse);
      } catch (e) {
        console.log(e);
        res.send({ data: {}, error: true });
      }
    })
    .catch(() => {
      res.send({ data: [], error: true });
    });
});

module.exports = router;
