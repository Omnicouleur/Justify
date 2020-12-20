/**
 * Justify a text
 * @param {Array} paragraphs - The array containing the paragraphs of the text
 * @param {number} lineMaxLength - The line length
 * @return {string} A justified text
 */
const justifyContent= (paragraphs, lineMaxLength) => {
    let justifiedContent = [];
    paragraphs.forEach( (paragraph)=> {
        justifiedContent.push (justifyParagrah(paragraph.split(" "),lineMaxLength));
    });
    return justifiedContent.join("\n");
};
/**
 * Convert an array of words into a justified string (Paragraph)
 * @param {Array} words - The array containing the words of the paragraph
 * @param {number} lineMaxLength - The line length
 * @return {string} A justified paragraph
 */
const justifyParagrah= (words, lineMaxLength) => {

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
};
/**
 * Append n spaces at the end of a given string str
 * @param {string} str - The string to which we'll add spaces at the end
 * @param {number} n - The number of spaces to add
 * @return {string} The new string with n spaces appended
 */
function appendSpaces(str, n) {
    for(var x = 0; x < n; x++ ) {
        str += " ";
    }
    return str;
}

module.exports = justifyContent;
