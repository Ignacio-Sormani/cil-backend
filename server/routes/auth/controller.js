const User = require('../../models/user');
const bcrypt = require('bcrypt');

const postUser = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length > 0) {
        return res.status(409).json({
          message: 'Mail already exists!'
        });
      }
      else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: 'Password could not be encrypted!'
            });
          }
          else {
            const user = new User({
              ...req.body,
              password: hash
            });
            user.save()
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

module.exports = { postUser };