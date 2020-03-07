const express = require('express');
const axios = require('axios');
const config = require('../../../config.js');
const getNumericProductId = require('../../util/shopify.js');
const productsQueries = require('../../queries/products.js');

const router = express.Router();

router.get('/', (req, res) => {
  axios({
    url: config.shopifyUrl,
    method: 'post',
    data: {
      query: productsQueries.allProductsQuery
    },
    headers: {
      'X-Shopify-Access-Token': config.SHOPIFY_ADMIN_API_PASSWORD
    }
  })
    .then(result => {
      const formattedResponse = { data: [], error: false };
      const data = result.data.data;
      data.products.edges.forEach((edge, index) => {
        const imageList = [];
        formattedResponse.data[index] = edge.node;
        formattedResponse.data[index].id = getNumericProductId(
          formattedResponse.data[index].id
        );
        edge.node.images.edges.forEach((imgEdge, imgIndex) => {
          imageList[imgIndex] = imgEdge.node.transformedSrc;
          formattedResponse.data[index].images = imageList;
        });
      });
      res.send(formattedResponse);
    })
    .catch(() => {
      res.send({ data: [], error: true });
    });
});

module.exports = router;
