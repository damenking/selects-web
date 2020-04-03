const express = require('express');
const axios = require('axios');
const config = require('../../../config.js');
const authQueries = require('../../graphql/queries/auth.js');
const { getNumericProductId } = require('../../util/shopify.js');

const router = express.Router();

router.get('/', (req, res) => {
  const { token } = req.query;
  axios({
    url: config.shopifyStorefrontUrl,
    method: 'post',
    data: {
      query: authQueries.getCustomerByCustomerAccessToken(token)
    },
    headers: {
      'X-Shopify-Storefront-Access-Token':
        config.SHOPIFY_STOREFRONT_ACCESS_TOKEN
    }
  })
    .then(response => {
      const base64Id = response.data.data.customer.id;
      const id = getNumericProductId(
        Buffer.from(base64Id, 'base64').toString()
      );
      axios({
        url: `${config.shopifyAdminRestUrlWithAuth}customers/${id}/orders.json`,
        method: 'get'
      })
        .then(response => {
          const orders = response.data.orders;
          const formattedOrders = orders.map(order => {
            return {
              createdAt: order.created_at,
              totalPrice: order.total_price,
              orderNumber: order.order_number,
              lineItems: order.line_items,
              statusUrl: order.order_status_url
            };
          });
          res.send({ data: { orders: formattedOrders }, error: false });
        })
        .catch(response => {
          res.send({ error: true });
        });
    })
    .catch(response => {
      res.send({ error: true });
    });
});

module.exports = router;
