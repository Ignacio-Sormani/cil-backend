const express = require('express');
const router = express.Router();
const auth = require('./auth');
const categories = require('./categories');

router.use('/auth', auth);
router.use('/categories', categories);

module.exports = router;