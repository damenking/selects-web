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
        formattedResponse.data.product.variantStorefrontIds = [];
        formattedResponse.data.product.variantPrices = [];
        formattedResponse.data.product.id = getNumericProductId(
          formattedResponse.data.product.id
        );
        data.variants.edges.forEach(edge => {
          edge.node.id = getNumericProductId(edge.node.id);
          formattedResponse.data.product.variantIds.push(edge.node.id);
          formattedResponse.data.product.variantStorefrontIds.push(
            edge.node.storefrontId
          );
          formattedResponse.data.product.variantPrices.push(edge.node.price);
        });
        formattedResponse.data.product.primaryVariantId =
          data.variants.edges[0].node.id;
        formattedResponse.data.product.primaryVariantStorefrontId =
          data.variants.edges[0].node.storefrontId;
        formattedResponse.data.product.primaryVariantPrice =
          data.variants.edges[0].node.price;
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
