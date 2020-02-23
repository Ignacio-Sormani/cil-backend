const express = require('express');
const router = express.Router();
const { postCategories, getCategories, deleteCategory } = require('./controller');
const checkToken = require('../../middleware/check-token');

router 
  .route('/')
  .post(checkToken, postCategories)
  .get(getCategories);

  router
  .route('/:categoryId')
  .delete(checkToken, deleteCategory);

module.exports = router;