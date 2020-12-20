const express = require('express');
const app = express();
const db = require('./config/db');

app.set('view engine', 'pug');
app.set('views', './views');
app.get('/', (req, res) => {
    res.render('index')
});

const justifyContent = require('./routes/justify-content.controller');
app.use('/api', justifyContent);

const AuthController = require('./routes/auth.controller');
app.use('/api/', AuthController);

module.exports = app;
