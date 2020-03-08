const express = require('express');
const axios = require('axios');
const config = require('../../../config.js');
const productsQueries = require('../../graphql/queries/products.js');
const getNumericProductId = require('../../util/shopify.js');

const router = express.Router();

router.get('/:productHandle', (req, res) => {
  const productHandle = req.params.productHandle;
  axios({
    url: config.shopifyAdminUrl,
    method: 'post',
    data: {
      query: productsQueries.productByHandleQuery(productHandle)
    },
    headers: {
      'X-Shopify-Access-Token': config.SHOPIFY_ADMIN_API_PASSWORD
    }
  })
    .then(response => {
      try {
        const formattedResponse = { data: {}, error: false };
        const data = response.data.data.productByHandle;
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
        res.send({ data: {}, error: true });
      }
    })
    .catch(response => {
      res.send({ data: [], error: true });
    });
});

module.exports = router;
