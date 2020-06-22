const express = require('express');
const axios = require('axios');
const config = require('../../../config.js');
const { getNumericProductId } = require('../../util/shopify.js');
const {
  allProductsQuery,
  productsSearchQuery,
  productsByTagsQuery,
} = require('../../graphql/queries/products.js');

const router = express.Router();

router.get('/', (req, res) => {
  // not currently used
  axios({
    url: config.shopifyAdminUrl,
    method: 'post',
    data: {
      query: allProductsQuery,
    },
    headers: {
      'X-Shopify-Access-Token': config.SHOPIFY_ADMIN_API_PASSWORD,
    },
  })
    .then((response) => {
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
    .catch((response) => {
      res.send({ data: {}, error: true });
    });
});

router.get('/search', (req, res) => {
  const { searchTerm } = req.query;
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  const lowerCaseSearchTermArray = lowerCaseSearchTerm.split(' ');
  axios({
    url: config.shopifyAdminUrl,
    method: 'post',
    data: {
      query: productsSearchQuery,
    },
    headers: {
      'X-Shopify-Access-Token': config.SHOPIFY_ADMIN_API_PASSWORD,
    },
  })
    .then((response) => {
      const formattedResponse = { data: { products: [] }, error: false };
      const data = response.data.data;
      data.products.edges.forEach((edge) => {
        if (edge.node.title.toLowerCase().includes(lowerCaseSearchTerm)) {
          const newIndex = formattedResponse.data.products.push(edge.node) - 1;
          formattedResponse.data.products[newIndex].id = getNumericProductId(
            formattedResponse.data.products[newIndex].id
          );
        } else if (
          edge.node.title
            .toLowerCase()
            .split(' ')
            .some((r) => lowerCaseSearchTermArray.includes(r))
        ) {
          const newIndex = formattedResponse.data.products.push(edge.node) - 1;
          formattedResponse.data.products[newIndex].id = getNumericProductId(
            formattedResponse.data.products[newIndex].id
          );
        } else if (
          edge.node.tags.some((r) =>
            lowerCaseSearchTermArray.includes(r.toLowerCase())
          )
        ) {
          const newIndex = formattedResponse.data.products.push(edge.node) - 1;
          formattedResponse.data.products[newIndex].id = getNumericProductId(
            formattedResponse.data.products[newIndex].id
          );
        }
      });
      res.send(formattedResponse);
    })
    .catch((response) => {
      res.send({ data: {}, error: true });
    });
});

router.get('/byIds', (req, res) => {
  const { ids } = req.query;
  if (!ids) {
    res.send({ data: { products: [] }, error: true });
  } else {
    axios({
      url: `${config.shopifyAdminRestUrlWithAuth}products.json?ids=${ids}`,
      method: 'get',
    })
      .then((response) => {
        const products = response.data.products;
        res.send({ data: { products }, error: false });
      })
      .catch((response) => {
        res.send({ data: { products: [] }, error: true });
      });
  }
});

router.get('/byTags', (req, res) => {
  const { tags } = req.query;
  if (!tags) {
    res.send({ data: { products: [] }, error: true });
  } else {
    axios({
      url: config.shopifyStorefrontUrl,
      method: 'post',
      data: {
        query: productsByTagsQuery(tags.replace(',', ' ')),
      },
      headers: {
        'X-Shopify-Storefront-Access-Token':
          config.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
    })
      .then((response) => {
        const products = response.data.data.products.edges;
        res.send({ data: { products }, error: false });
      })
      .catch((response) => {
        res.send({ data: { products: [] }, error: true });
      });
  }
});

module.exports = router;
