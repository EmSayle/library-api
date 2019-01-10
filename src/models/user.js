const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: String,
  secondName: String,
  email: String,
  password: String
});

userSchema.pre('save', function encryptPassword(next) {
  if (!this.isModified('password')) {
    next();
  } else {

  bcrypt.hash(this.password, 10, (error, hash) => { 
    if (error) {
      next(error);
    } else {
      this.password = hash;
      return next();
    }
  });
};
});

userSchema.methods.sanitize = function sanitize() {
  const { password, ...rest } = this.toObject();
  return rest;
};


const User = mongoose.model('User', userSchema);

module.exports = User;
