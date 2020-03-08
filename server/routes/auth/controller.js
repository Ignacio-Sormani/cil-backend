const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const postUser = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length > 0) {
        return res.status(400).json({
          error: 'Mail already exists!'
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: 'Password could not be encrypted!'
            });
          } else {
            const user = new User({
              ...req.body,
              password: hash
            });
            user
              .save()
              .then(response => {
                res.status(201).json({
                  message: 'User was created!',
                  data: {
                    fullName: response.fullName,
                    email: response.email
                  }
                });
              })
              .catch(() => {
                res.status(500).json({
                  error: 'User could not be created!'
                });
              });
          }
        });
      }
    });
};

const login = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(response => {
      if (!response) {
        return res.status(400).json({
          error: 'Authentication failed!'
          // we send this message so we dont give real information to the person trying to login
          // the real error is: 'Email does not exist'
        });
      }
      bcrypt.compare(
        req.body.password,
        response.password,
        (err, compareResponse) => {
          if (err) {
            return res.status(400).json({
              error: 'Authentication failed!'
            });
          }
          if (compareResponse) {
            const token = jwt.sign(
              {
                email: response.email,
                id: response.id
              },
              'cilkey',
              {
                expiresIn: '2h'
              }
            );
            return res.status(200).json({
              message: 'Authentication was successful!',
              data: {
                fullName: response.fullName,
                email: response.email,
                token
              }
            });
          }
          res.status(400).json({
            error: 'Authentication failed!'
            // the real error is: 'Incorrect password'
          });
        }
      );
    })
    .catch(() => {
      res.status(500).json({
        error: 'Authentication failed!'
      });
    });
};

module.exports = { postUser, login };
