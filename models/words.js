var mongoose = require('mongoose');

var wordsSchema = mongoose.Schema({
    evidence: String, 
    word: String, 
    level: Number,
});

module.exports = mongoose.model('Words', wordsSchema);