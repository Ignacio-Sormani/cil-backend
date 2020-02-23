const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes');

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', 'POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

mongoose.set('useCreateIndex', true);
mongoose.connect(
  'mongodb+srv://CIL-ADMIN:cil2019@cil-cluster-ldtk8.gcp.mongodb.net/database?retryWrites=true&w=majority',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);
 
app.use(router);

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

router.use((error, req, res, next) => {
  res.status = error.status || 500;
  res.json({
    error: {
      message: error.message,
      status: res.status
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});