const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');

const Word = require('./models/words');
const Player = require('./models/players');

//const words = require('./server/words.json');

/* file connection to db */

// var wordSchema = mongoose.Schema({
//     evidence: String, 
//     word: String, 
//     level: Number, 
// }); 
 
//var Word = mongoose.model('Word', wordSchema);

mongoose.connect('mongodb://main_user:find_main@ds115579.mlab.com:15579/find_the_word');

var connection = mongoose.connection;

connection.on('connected' , function () {
    console.log('connection ok');
   
})

connection.on('disconnected' , function () {
    console.log('connection disconnect');
})

connection.on('error' , function () {
    console.log('connection error');
})

process.on('SIGINT' , function () {
    connection.close( function () {
        console.log('connection close due to process termination')
        process.exit(0)
    })
})

// module.exports = connection;


const PORT = process.env.PORT || 3000;

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
 
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/dist')));

// app.use(express.static(__dirname + '/dist'));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client/dist/'));
// });

app.get('/word' , function(req,res){ 
    // Utilisation de notre schéma Word pour interrogation de la base
        Word.find(function(err, words){
            if (err){
                res.send(err); 
            }
            res.json(words); 
            
        }); 
    }) // SUIT


    app.post('/word' , function(req,res){ 
      let word = new Word({
        evidence: req.body.evidence, 
        word: req.body.word, 
        level:req.body.level,
      });
        word.save( function(err, word) {
            if (err) {
            res.send(err);
            }
            console.log('nouveau mot : ' , word);
            res.json(word);
            console.log('body ', req.body);
            });
        }) // SUIT


app.listen(PORT , ()=> {
    console.log('le serveur écoute le port ' + PORT);
})