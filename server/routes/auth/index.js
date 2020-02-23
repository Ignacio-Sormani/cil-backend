const express = require('express');
const router = express.Router();
const { postUser , login } = require('./controller');

router
  .route('/')
  .post(postUser);

router
  .route('/login')
  .post(login);

module.exports = router;