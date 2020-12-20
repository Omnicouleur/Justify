const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const config = require('../config/config');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const utils = require('../utils/justify-utils');
router.post('/token', (req, res) => {
    if (!utils.validateEmail(req.body.email)) {
        res.status(422).send('Please fill a valid email address');
        return;
    }
    //check if email exists
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) {
            // if new email => Add to Db + create token
            createNewUser(req, res);
        }
        // if user exists in DB create token
        else {
            createToken(req, res, user);
        }
    });
});

const createNewUser = (req, res) => {
    User.create({
            email: req.body.email,
            wordCount: 0,
            firstWord: Date.now(),
        },
        (err, user) => {
            if (err) return res.status(500).send("There was a problem registering the user.", err.message, err);
            createToken(req, res, user)
        });
}
const createToken = (req, res, user) => {
    const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({auth: true, token: token});
}
module.exports = router;
