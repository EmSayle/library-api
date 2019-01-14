
exports.signUp = user => new Promise((resolve, reject) => {
  chai.request(server)
  .post('/user')
  .send(user)
  .end((error, response) => {
    if (error) {
      reject(error);
    } else {
      resolve(response);
    }
  });
});

module.exports = exports;