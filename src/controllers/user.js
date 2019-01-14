const User = require('../models/user');

exports.create = (req, res) => {
  // console.log(req.body);
  
  const user = new User({
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    email: req.body.email,
    password: req.body.password,
  });
// console.log(user);

  user.save()
    .then(() => {
      res.status(201).json(user.sanitize());
    })
    .catch((error) => {
      
      if (error.name === 'ValidationError') {
        const emailError = error.errors.email ? error.errors.email.message : null;
        const passwordError = error.errors.password ? error.errors.password.message : null;
        res.status(400).json({
          errors: {
            email: emailError,
            password: passwordError,
          },
        })
      } else {
        res.sendStatus(500);
      }  
    });
};