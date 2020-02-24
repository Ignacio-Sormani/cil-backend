const express = require('express');
const router = express.Router();
const { postProduct, getProducts, modifyProduct, deleteProduct } = require('./controller');
const checkToken = require('../../middleware/check-token');

router
  .route('/')
  .post(checkToken, postProduct)
  .get(checkToken, getProducts);

router
  .route('/:productId')
  .patch(checkToken, modifyProduct)
  .delete(checkToken, deleteProduct);

module.exports = router;