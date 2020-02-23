const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'cilkey')
    //req.userData = decoded; // I can use the decoded token to use its data
    next(); 
  }
  catch (error) {
    return res.status(401).json({
      error: 'You dont have permission!'
    });
  }
};

module.exports = checkToken;