var mongoose = require('mongoose');
var config = require('/config');

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true },function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to database');
    }});
