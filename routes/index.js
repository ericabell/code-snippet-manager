var express = require('express');
var router = express.Router();

let Snippet = require('../models/snippet.js');

/* MAIN PAGE - VIEW ALL SNIPPETS */
router.get('/', function(req, res, next) {
  Snippet.find({})
    .then( (snippets) => {
      console.log(snippets);
      res.render('index', { title: 'Code Snip Manager',
                            editors: snippets.length,
                            snippets: snippets
                          });
    })
    .catch( (err) => {
      console.log(err);
    })
});

router.get('/snip/create', function(req,res,next) {
  res.render('create', { title: 'Code Snip Manager'});
});

router.post('/snip/create', function(req, res, next) {
  // TODO: grab info from form submission and create a new
  //       snippet
  res.send('snippet created!');
});

module.exports = router;
