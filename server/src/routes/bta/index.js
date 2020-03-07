const express = require('express');
const booking = require('./booking.js');
const product = require('./product.js');

const router = express.Router();

router.use('/booking', booking);
router.use('/product', product);

module.exports = router;
