const User = require('../models/user');

exports.create = (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    email: req.body.email,
    password: req.body.password,
  });

  user.save()
    .then(() => {
      res.status(201).json(user.sanitize());
    })
    .catch((error) => {
      res.status(400).json(error, 'error, cannot save user');
    });
};