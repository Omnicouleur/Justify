var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var config = require('../../config');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var User = require('../../models/User');
var jwt = require('jsonwebtoken');

router.post('/token', function(req, res) {

    //check if email exists
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user)  {
            // if new email => Add to Db + create token
            User.create({
                    email : req.body.email,
                    wordCount: 0,
                    firstWord : Date.now(),
                },
                function (err, user1) {
                    if (err) return res.status(500).send("There was a problem registering the user.",err.message,err);
                    // create a token
                    var token = jwt.sign({ id: user1._id }, config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    res.status(200).send({ auth: true, token: token });
                    return ;
                });
        }
        // if user exists in DB create token
        if (user) {
            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token });
        }
    });
});

module.exports = router;
