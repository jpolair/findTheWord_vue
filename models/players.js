var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playersSchema = new Schema({
    pseudo:String,
    bestScore:Number,
    sumOfScore:Number,
    NumberOfgame:Number,
    average:Number
});

module.exports = mongoose.model('Players', playersSchema);