const express = require('express');
const axios = require('axios');
const config = require('../../../config.js');
const { getNumericProductId } = require('../../util/shopify.js');
const productsQueries = require('../../graphql/queries/products.js');

const router = express.Router();

router.get('/', (req, res) => {
  axios({
    url: config.shopifyAdminUrl,
    method: 'post',
    data: {
      query: productsQueries.allProductsQuery
    },
    headers: {
      'X-Shopify-Access-Token': config.SHOPIFY_ADMIN_API_PASSWORD
    }
  })
    .then(response => {
      const formattedResponse = { data: { products: [] }, error: false };
      const data = response.data.data;
      data.products.edges.forEach((edge, index) => {
        const imageList = [];
        formattedResponse.data.products[index] = edge.node;
        formattedResponse.data.products[index].id = getNumericProductId(
          formattedResponse.data.products[index].id
        );
        edge.node.images.edges.forEach((imgEdge, imgIndex) => {
          imageList[imgIndex] = imgEdge.node.transformedSrc;
          formattedResponse.data.products[index].images = imageList;
        });
      });
      res.send(formattedResponse);
    })
    .catch(response => {
      res.send({ data: {}, error: true });
    });
});

module.exports = router;
