const express = require('express');
const product = require('./product.js');
const products = require('./products.js');

const router = express.Router();

router.use('/product', product);
router.use('/products', products);

module.exports = router;
