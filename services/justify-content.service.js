/**
 * Justify a text
 * @param {string[]} paragraphs - The array containing the paragraphs of the text
 * @param {number} lineMaxLength - The line length
 * @return {string} A justified text
 */
const justifyContent = (paragraphs, lineMaxLength) => {
    let justifiedContent = [];
    paragraphs.forEach((paragraph) => {
        justifiedContent.push(justifyParagraph(paragraph.split(" "), lineMaxLength));
    });
    return justifiedContent.join("\n");
};
/**
 * Convert an array of words into a justified string (Paragraph)
 * @param {string[]} words - The array containing the words of the paragraph
 * @param {number} lineMaxLength - The line length
 * @return {string} A justified paragraph
 */
const justifyParagraph = (words, lineMaxLength) => {
    let lines = splitParagraphIntoLines(words, lineMaxLength);
    lines = addSpacesTolines(lines, lineMaxLength);
    return lines.join("\n");
};

/**
 * Convert an array of words into an array of lines
 * @param {string[]} words - The array containing the words of the paragraph
 * @param {number} lineMaxLength - The line length
 * @return {string[]} An array of lines
 */
const splitParagraphIntoLines = (words, lineMaxLength) => {
    let lines = [];
    let i = 0; //line number
    lines[i] = [];

    for (let n = 0; n < words.length; n++) {
        // to ignore spaces at the beginning
        if (words[n] === "") {
            continue;
        }
        if ((lines[i].join(' ').length + words[n].length + 1) <= lineMaxLength) {
            lines[i].push(words[n]);
        } else {
            lines[++i] = [];
            lines[i].push(words[n]);
        }
    }
    return lines;
};
/**
 * Add spaces to lines in order to justify these lines
 * @param {string[]} lines - The array containing the lines
 * @param {number} lineMaxLength - The line length
 * @return {string[]} An array of justified lines
 */
const addSpacesTolines = (lines, lineMaxLength) => {
    let justifiedLines = lines;
    for (let x = 0; x < justifiedLines.length; x++) {
        let line = justifiedLines[x].join(" ");
        let spaces = lineMaxLength - line.length;
        if (x === justifiedLines.length - 1 || justifiedLines[x].length === 1) {
            justifiedLines[x] = appendSpaces(line, spaces);
        } else {
            const currentLine = justifiedLines[x];
            const gaps = currentLine.length - 1;
            spaces = lineMaxLength - currentLine.join("").length;
            let extraSpaces = spaces % gaps;
            const spacesPerGap = Math.floor(spaces / gaps);
            line = "";
            for (let j = 0; j < currentLine.length; j++) {
                let addOneSpace = false;
                if (extraSpaces > 0) {
                    addOneSpace = true;
                    extraSpaces--;
                }
                const filler = spacesPerGap + (addOneSpace ? 1 : 0);
                if (j === currentLine.length - 1) {
                    line += currentLine[j];
                } else {
                    line += appendSpaces(currentLine[j], filler);
                }
            }
            justifiedLines[x] = line;
        }
    }
    return justifiedLines;
};
/**
 * Append n spaces at the end of a given string str
 * @param {string} str - The string to which we'll add spaces at the end
 * @param {number} spaces - The number of spaces to add
 * @return {string} The new string with n spaces appended
 */
const appendSpaces = (str, spaces) => {
    for (let x = 0; x < spaces; x++) {
        str += " ";
    }
    return str;
};

module.exports = justifyContent;
