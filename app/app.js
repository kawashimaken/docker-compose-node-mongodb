var express = require('express');
var app = express();
var mongoose = require('mongoose');

//DB setup

mongoose.connect('mongodb://mongo:27017/');

app.get('/', function (req, res) {
  res.send("Hello World! This is from node.js 10 and mongodb 3.4!");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});