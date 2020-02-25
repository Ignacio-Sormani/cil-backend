const express = require('express');
const router = express.Router();
const auth = require('./auth');
const categories = require('./categories');
const products = require('./products');

router.use('/public/uploads', express.static('public/uploads'));
router.use('/auth', auth);
router.use('/categories', categories);
router.use('/products', products);

module.exports = router;
