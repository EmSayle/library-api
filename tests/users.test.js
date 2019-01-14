const mongoose = require('mongoose');
const User = require('../src/models/user');
const UserHelpers = require('./helpers/user-helpers');
const DataFactory = require('./helpers/data-factory')


describe('/user', () => {
  beforeEach((done) => {
    mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  describe('POST /user', () => {
    it('creates a new user in the database', (done) => {
      const data = DataFactory.user()
      UserHelpers.signUp(data)
      .then((res) => {
        
        User.findById(res.body._id, (err, user) => {
          expect(err).to.equal(null);
          expect(user.firstName).to.equal(data.firstName)
          expect(user.secondName).to.equal(data.secondName)
          expect(user.email).to.equal(data.email)
          expect(user.password).to.not.equal(data.password)
          expect(user.password.length).to.equal(60)
          expect(res.body).not.to.have.property('password');
          done();
        });
      })
    })
  })
    it('api validates the email address is valid', (done) => {
      const user = DataFactory.user( {email: 'emaiil.com'})
      UserHelpers.signUp(user)
      .then((res) => {
        expect(res.status).to.equal(400);
        expect(res.body.errors.email).to.equal('please enter a valid email address');
        done();
      })
    });

    it('api validates the password is 8 characters long', (done) => {
      const user = DataFactory.user( {password: 'pass'})
      UserHelpers.signUp(user)
        .then((res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors.password).to.equal('please enter a valid password');
          done();
        })
      })
    });
    
    