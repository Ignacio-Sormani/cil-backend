const express = require('express');
const router = express.Router();
const { postCategories, getCategories } = require('./controller');

router 
  .route('/')
  .post(postCategories)
  .get(getCategories);

module.exports = router;