const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    jwt.verify(token, 'cilkey');
    next();
  } catch (err) {
    return res.status(401).json({
      error: 'You dont have permission!'
    });
  }
};

module.exports = checkToken;
