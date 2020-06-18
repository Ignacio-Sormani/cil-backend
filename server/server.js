const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes');

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  // Set which client/s have access to the API
  res.header('Access-Control-Allow-Origin', '*');
  // Set which kind of headers we want to accept
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  // Set which http methods are accepted
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(
  'mongodb+srv://admin:DI7m9TSMaM6SrS3X@sap-project-ldtk8.mongodb.net/database?retryWrites=true&w=majority',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);

app.use(router);

// Handling default errors
router.use((req, res, next) => {
  // This error is when the request is not handled in the defined endpoints
  const error = new Error('Not Found'); // Route was not found
  error.status = 404;
  next(error); // The next method forward the new error defined in this arrow function
});

router.use((error, req, res, next) => {
  // This handles all kind of errors in the backend app
  res.status = error.status || 500;
  res.json({
    error: {
      message: error.message,
      status: res.status
    }
  });
});
// End of handling default errors
app.listen(process.env.PORT || port, () => {
  console.log(`Server running at port ${port}`);
});
