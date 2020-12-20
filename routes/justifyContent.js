let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

let User = require('../models/User');
let VerifyToken = require('./auth/VerifyToken');
let justifyContent = require('../services/justifyContent.service');
router.get('/',function (req,res) {
        res.status(200).send('Welcome to our application');
    }
);

// justify the text : 80 characters per line
router.post('/justify', VerifyToken, function(req, res) {

    User.findById(req.userId, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");

        const words = req.body.textToJustify.split(" ");
        const paragraphs = req.body.textToJustify.split("\n");
        let hasReachedLimit = true;
        if (!sameDay(user.firstWord,new Date())) {
            hasReachedLimit = false;
            user.firstWord = Date.now();
        }
        else if (user.wordCount + words.length < 80000){
            hasReachedLimit = false;
        }
        if (hasReachedLimit){
            res.status(402).send('402 Payment Required');
        }
        else {
            let justifiedText = justifyContent(paragraphs,80);
            user.wordCount+= words.length;
            user.save();
            res.status(200).send(justifiedText);
        }
    });
});
/**
 * Compares 2 dates in order to find out if they're in the same day
 * @param {date} d1 - The first date
 * @param {date} d2 - The second date
 * @return {boolean} True if both dates are in the same day.
 */
const sameDay = (d1, d2) => {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
};

module.exports = router;
