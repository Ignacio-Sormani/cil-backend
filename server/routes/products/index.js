const express = require('express');
const router = express.Router();
const postProduct = require('./controller');

router
  .route('/')
  .post(postProduct);

module.exports = router;