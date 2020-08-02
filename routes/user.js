'use strict'

var express = require('express');
var app = express.Router();

var UserController = require('../controllers/user');
var md_auth = require('../middlewares/authenticate');


app.get('/', UserController.home);
app.get('/prueba', md_auth.ensureAuth, UserController.prueba);
app.post('/register', UserController.saveUser);
app.post('/login', UserController.loginUser);

module.exports = app;