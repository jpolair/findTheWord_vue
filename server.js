const express = require('express')
const hbs = require('hbs')
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')
const mongoose = require('mongoose')

const Word = require('./models/words')
const Player = require('./models/players')

const URL_CREDENTIALS_MONGO = process.env.URL_CREDENTIALS_MONGO
const PORT = process.env.PORT || 3000

mongoose.connect(URL_CREDENTIALS_MONGO)
var connection = mongoose.connection;

connection.on('connected' , function () {
    console.log('connection ok')
})

connection.on('disconnected' , function () {
    console.log('connection disconnect')
})

connection.on('error' , function () {
    console.log('connection error')
})

process.on('SIGINT' , function () {
    connection.close( function () {
        console.log('connection close due to process termination')
        process.exit(0)
    })
})

let app = express();

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'client/dist')))

app.get('/word' , function(req,res){ 
        Word.find(function(err, words){
            if (err){
                res.send(err)
            }
            res.json(words) 
        })
    }) 

app.post('/word' , function(req,res){ 
    let word = new Word({
        evidence: req.body.evidence, 
        word: req.body.word, 
        level:req.body.level,
    })
    word.save( function(err, word) {
        if (err) {
        res.send(err)
        }
        console.log('nouveau mot : ' , word)
        res.json(word);
        console.log('body ', req.body)
    })
}) 
app.delete('/word/:word' , function(req, res) {
    Word.deleteOne(({word:req.params.word} , function (err, word) {
        if (err) {
        res.send(err)
        console.log(err)
        }
        res.json({ message: 'succes on deleted action'})
    }))
})
app.listen(PORT , ()=> {
    console.log('le serveur écoute le port ' + PORT)
})