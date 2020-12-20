var express = require('express');
var app = express();
var db = require('./db');

app.set('view engine', 'pug');
app.set('views', './views');
app.get('/', (req,res) => {
    res.render('index')
});

var justifyContent = require('./routes/justifyContent');
app.use('/api', justifyContent);

var AuthController = require('./routes/auth/AuthController');
app.use('/api/', AuthController);

module.exports = app;
