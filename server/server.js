const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes');

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.set('useCreateIndex', true);
mongoose.connect(
  'mongodb+srv://CIL-ADMIN:cil2019@cil-cluster-ldtk8.gcp.mongodb.net/database?retryWrites=true&w=majority',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);
 
app.use(router);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});