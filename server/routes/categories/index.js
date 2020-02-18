const express = require('express');
const router = express.Router();
const { postCategories, getCategories, deleteCategory } = require('./controller');

router 
  .route('/')
  .post(postCategories)
  .get(getCategories);

  router
  .route('/:categoryId')
  .delete(deleteCategory);

module.exports = router;