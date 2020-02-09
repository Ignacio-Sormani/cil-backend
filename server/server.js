const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
app.use(router);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});