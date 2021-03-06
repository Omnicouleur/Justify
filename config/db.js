const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to database');
    }
});
