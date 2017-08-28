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

module.exports = router;
