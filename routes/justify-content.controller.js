const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

const User = require('../models/User');
const justifyContent = require('../services/justify-content.service');
const utils = require('../utils/justify-utils')
router.get('/', (req, res) => {
        res.status(200).send('Welcome to our application');
    }
);

// justify the text : 80 characters per line
router.post('/justify', utils.verifyToken, function (req, res) {

    User.findById(req.userId, function (err, user) {
        if (err) {
            return res.status(500).send("There was a problem finding the user.")
        }
        if (!user) {
            return res.status(404).send("No user found.")
        }

        const words = req.body.textToJustify.split(" ");
        const paragraphs = req.body.textToJustify.split("\n");
        let hasReachedLimit = true;
        if (!utils.sameDay(user.firstWord, new Date())) {
            hasReachedLimit = false;
            user.firstWord = Date.now();
        } else if (user.wordCount + words.length < 80000) {
            hasReachedLimit = false;
        }
        if (hasReachedLimit) {
            res.status(402).send('402 Payment Required');
        } else {
            const justifiedText = justifyContent(paragraphs, 80);
            user.wordCount += words.length;
            user.save();
            res.status(200).send(justifiedText);
        }
    });
});

module.exports = router;
