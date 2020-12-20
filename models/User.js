const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    wordCount: Number,
    firstWord: Date,
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
