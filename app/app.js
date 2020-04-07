var express = require('express')

var mongoose = require('mongoose')
var passport = require('passport')
var OAuth2Strategy = require('passport-oauth2').Strategy
//
var app = express();
app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard dog', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
//
passport.use(new OAuth2Strategy({
  //Laravel passportのurlパターンに合わせる
  authorizationURL: 'http://xxxxxx.ngrok.io/oauth/authorize',
  tokenURL: 'http://xxxxxx.ngrok.io/oauth/token',
  clientID: 11,
  clientSecret: 'yyyyyyyyyyy',
  callbackURL: "http://localhost:3000/auth/example/callback",
},
  function (accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ exampleId: profile.id }, function (err, user) {
    //   res.send('OK')
    //   return cb(err, user);
    // });
    console.log('Hi, OAuth2', accessToken)
    return cb(accessToken);
  }
));

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
    res.send(kittens);
  })
})

//
app.get('/auth/example',
  passport.authenticate('oauth2'));
//
app.get('/auth/example/callback',
  passport.authenticate('oauth2', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log('called back')
    res.redirect('/');
  });

//
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
