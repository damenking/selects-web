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
        const formattedResponse = { data: { product: {} }, error: false };
        const data = response.data.data.productByHandle;
        formattedResponse.data.product = data;
        formattedResponse.data.product.variantIds = [];
        formattedResponse.data.product.id = getNumericProductId(
          formattedResponse.data.product.id
        );
        formattedResponse.data.product.primaryVariantId = getNumericProductId(
          data.variants.edges[0].node.id
        );
        formattedResponse.data.product.price =
          data.priceRange.maxVariantPrice.amount;
        res.send(formattedResponse);
      } catch (e) {
        res.send({ data: {}, error: true });
      }
    })
    .catch(response => {
      res.send({ data: {}, error: true });
    });
});

module.exports = router;
