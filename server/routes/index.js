const express = require('express');
const router = express.Router();
const auth = require('./auth');
const categories = require('./categories');
const products = require('./products');

router.use('/public/uploads', express.static('public/uploads'));
router.use('/', express.static('public/build'));
router.use('/api/auth', auth);
router.use('/api/categories', categories);
router.use('/api/products', products);

module.exports = router;
