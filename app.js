var express = require('express');
var app = express();
var db = require('./db');

var justifyContent = require('./routes/justifyContent');
app.use('/api', justifyContent);

var AuthController = require('./routes/auth/AuthController');
app.use('/api/', AuthController);

module.exports = app;
