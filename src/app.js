const express = require('express');
const user = require('./controllers/user');

const app = express();

app.use(express.json());

app.post('/user', user.create);
console.log(1, 'user created');



module.exports = app;
