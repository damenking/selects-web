const express = require('express');
const customer = require('./customer.js');
const product = require('./product.js');
const products = require('./products.js');

const router = express.Router();

router.use('/customer', customer);
router.use('/product', product);
router.use('/products', products);

module.exports = router;
