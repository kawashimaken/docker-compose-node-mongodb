var express = require('express')
var app = express()
var mongoose = require('mongoose')

//DB setup

mongoose.connect('mongodb://mongodb:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
//
var kittySchema = new mongoose.Schema({
  name: String
});
var Kitten = mongoose.model('Kitten', kittySchema);
var silence = new Kitten({ name: 'Silence' });

//
app.get('/', function (req, res) {
  res.send('Hello World! This is from node.js 12 and mongodb 3.6!')
})
//
app.get('/write', function (req, res) {
  silence.save().then(() => console.log('meow'))
})
//
app.get('/read', function (req, res) {
  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  })
})

//
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
