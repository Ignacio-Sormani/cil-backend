const express = require('express');
const router = express.Router();
const { postCategories } = require('./controller');

router 
  .route('/')
  .post(postCategories);
   
module.exports = router;