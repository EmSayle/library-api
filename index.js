const mongoose = require('mongoose');
const app = require('./src/app');

mongoose.connect(process.env.DATABASE_CONN, { useNewUrlParser: true }, (err) => {
  console.log(err);
  console.log(process.env.DATABASE_CONN);
  app.listen(3000, (error) => {
    console.log(error);
  });
});
