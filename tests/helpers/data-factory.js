const faker = require('faker');

exports.user = (options = {}) => ({ 
  firstName: options.firstName || faker.name.firstName(), 
  secondName: options.secondName || faker.name.lastName(), 
  email: options.email || faker.internet.email(),
  password: options.password || faker.internet.password(),
});

module.exports = exports; 