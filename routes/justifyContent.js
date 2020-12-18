let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

let User = require('../models/User');
let VerifyToken = require('./auth/VerifyToken');

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
            let justifiedText ="";
            paragraphs.forEach( (paragraph)=> {
                justifiedText += "\n"+textJustification(paragraph.split(" "),80);
            });
            user.wordCount+= words.length;
            user.save();
            res.status(200).send(justifiedText);
        }
    });
});
const sameDay = (d1, d2) => {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
};
function textJustification(words, lineMaxLength) {

    let lines = [];
    let i = 0; //line number
    lines[i] = [];
    // Split the phrase array into lines
    for (let n=0;n<words.length;n++) {
        // to ignore spaces at the beginning
        if (words[n]===""){
            continue;
        }
        if((lines[i].join(' ').length + words[n].length + 1) <= lineMaxLength) {
            lines[i].push(words[n]);
        }
        else {
            lines[++i] = [];
            lines[i].push(words[n]);
        }
    }
    // Add spaces between words
    for (let x=0;x<lines.length;x++){
        let line = lines[x].join(" ");
        let spaces = lineMaxLength - line.length;
        // last line or just 1 word on the line =>  words are left justified, spaces on the right.
        if( x === lines.length - 1 || lines[x].length === 1) {
            lines[x] = appendSpaces(line, spaces);
        }
        else {
            let currentLine = lines[x];
            let gaps = currentLine.length - 1;
            spaces = lineMaxLength - currentLine.join("").length;
            let extraSpaces = spaces % gaps;
            let spacesPerGap = Math.floor(spaces / gaps);
            line = "";
            for(let j = 0; j < currentLine.length; j++) {
                let addOneSpace = false;
                if(extraSpaces > 0) {
                    addOneSpace = true;
                    extraSpaces--;
                }
                const filler = spacesPerGap + (addOneSpace ? 1 : 0);
                if (j === currentLine.length - 1) {
                    line += currentLine[j];
                }
                else {
                    line += appendSpaces(currentLine[j], filler);
                }
            }
            lines[x] = line;
        }
    }
    return lines.join("\n");
}
function appendSpaces(str, n) {
    for(var x = 0; x < n; x++ ) {
        str += " ";
    }
    return str;
}

module.exports = router;
