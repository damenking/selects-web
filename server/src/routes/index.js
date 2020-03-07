const express = require('express');
const bta = require('./bta/');
const shopify = require('./shopify/');

const router = express.Router();

router.use('/bta', bta);
router.use('/shopify', shopify);

module.exports = router;
