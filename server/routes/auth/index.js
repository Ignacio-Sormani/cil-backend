const express = require('express');
const router = express.Router();
const { postUser } = require('./controller');

router
  .route('/')
  .post(postUser);

module.exports = router;