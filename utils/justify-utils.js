const jwt = require('jsonwebtoken');
const config = require('../config/config');

let utils = {};
/**
 * Verifies that the token is valid
 */
utils.verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function(err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        req.userId = decoded.id;
        next();
    });
}


/**
 * Verifies that the email's syntax is valid
 * @param {string} email - The email to verify
 * @return {boolean} True if email's syntax is valid
 */
utils.validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    return re.test(email)
};

/**
 * Compares 2 dates in order to find out if they're in the same day
 * @param {date} d1 - The first date
 * @param {date} d2 - The second date
 * @return {boolean} True if both dates are in the same day.
 */
utils.sameDay = (d1, d2) => {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
};

module.exports = utils;

