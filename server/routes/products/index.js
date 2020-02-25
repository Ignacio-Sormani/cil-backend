const express = require('express');
const router = express.Router();
const {
  postProduct,
  getProducts,
  modifyProduct,
  deleteProduct,
  getActiveProducts
} = require('./controller');
const checkToken = require('../../middleware/check-token');
const { getCategoryById } = require('../categories/controller');
const { upload } = require('../../middleware/upload-image');

router
  .route('/')
  .post(checkToken, upload, getCategoryById, postProduct)
  .get(checkToken, getProducts);

router
  .route('/:productId')
  .patch(checkToken, getCategoryById, modifyProduct)
  .delete(checkToken, deleteProduct);

router.route('/active').get(getActiveProducts);

module.exports = router;
