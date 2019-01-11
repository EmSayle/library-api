const mongoose = require('mongoose');
const User = require('../src/models/user');

describe('/user', () => {
  beforeEach((done) => {
    mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  describe('POST /user', () => {
    it('creates a new user in the database', (done) => {
      chai.request(server)
        .post('/user')
        .send({
          firstName: 'Terry',
          secondName: 'Tester',
          email: 'email@email.com',
          password: 'password1'
        })
        .end((error, res) => {
          expect(error).to.equal(null);
          
          expect(res.status).to.equal(201);

          User.findById(res.body._id, (err, user) => {
            expect(err).to.equal(null);
            expect(user.firstName).to.equal('Terry')
            expect(user.secondName).to.equal('Tester')
            expect(user.email).to.equal('email@email.com')
            expect(user.password).to.not.equal('password1')
            expect(user.password.length).to.equal(60)
            expect(res.body).not.to.have.property('password');
            done();
          });
        });
    });
  });
    it('api validates the email address is valid', (done) => {
      chai.request(server)
      .post('/user')
      .send({
        firstName: 'Terry',
        secondName: 'Tester',
        email: 'emailemail.com',
        password: 'password1'
      })
      .end((error, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.errors.email).to.equal('please enter a valid email address');
        done();
      })
    })
    it('api validates the password is 8 characters long', (done) => {
      chai.request(server)
      .post('/user')
      .send({
        firstName: 'Terry',
        secondName: 'Tester',
        email: 'emaile@mail.com',
        password: 'pass'
      })
      .end((error, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.errors.password).to.equal('please enter a valid password');
        done();
      })
    })
});
