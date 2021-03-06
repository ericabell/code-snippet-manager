const express = require('express');
const passport = require('passport');

let router = express.Router();

let Snippet = require('../models/snippet.js');
let User = require('../models/auth.js');

let Utilities = require('./utilities');


// USER AUTH ROUTES FOR LOGIN AND REGISTER
router.get('/login', (req, res) => {
  res.render('login', {title: 'Code Snip Manager',
                       user: Utilities.extractName(req)
                     })
});

const checkPost = function(req, res, next) {
  console.log('in checkPost');
  console.log("body parsing", req.body);
  next();
}

router.post('/login', checkPost,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/failure',
  })
);

router.get('/success', (req, res) => {
  res.send('success!');
});

router.get('/failure', (req, res) => {
  res.send('failure!');
});


router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

router.get('/register', (req, res) => {
  res.render('register', {title: 'Code Snip Manager'});
});

router.post('/register', (req, res, next) => {
  User.create({username: req.body.username,
               password: req.body.password,
               name: req.body.name
             },
    function(err, doc) {
      if( err ) throw err;
      console.log(doc);
      console.log('user created successfully!');
      next();
    });
} , passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/failure',
}));

module.exports = router;
