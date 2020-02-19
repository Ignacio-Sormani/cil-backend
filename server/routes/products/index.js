const express = require('express');
const router = express.Router();
const { postProduct, getProducts } = require('./controller');

router
  .route('/')
  .post(postProduct)
  .get(getProducts);

module.exports = router;