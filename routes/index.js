var express = require('express');
var router = express.Router();

let Snippet = require('../models/snippet.js');

/* MAIN PAGE - VIEW ALL SNIPPETS */
router.get('/', function(req, res, next) {
  if(req.user) {
    console.log(req.user);
  }
  Snippet.find({})
    .then( (snippets) => {
      res.render('index', { title: 'Code Snip Manager',
                            editors: snippets.length,
                            snippets: snippets,
                            user: extractName(req)
                          });
    })
    .catch( (err) => {
      console.log(err);
    })
});

router.get('/snip/create', function(req,res,next) {
  res.render('create', { title: 'Code Snip Manager',
                         user: extractName(req)
                          });
});

router.post('/snip/create', function(req, res, next) {
  let newTitle = req.body.title;
  let newLanguage = req.body.language;
  let newCode = req.body.code;

  Snippet.create({title: newTitle,
                  language: newLanguage,
                  code: newCode,
                  owner: extractUsername(req)
                })
      .then( (doc) => {
        console.log(`snippet added: ${doc}`);
        res.redirect('/');
      })
      .catch( (err) => {
        res.send(`Error creating snippet: ${err}`);
      })
});

// HELPER FUNCTIONS
// extractName checks to see if current user is authenticated,
// if they are, return their name. If not, return Anonymous user
let extractName = function(req) {
  if( req.user ) {
    return req.user.name;
  }
  return 'Anonymous User';
}

let extractUsername = function(req) {
  if( req.user ) {
    return req.user.username;
  }
  return 'anonymous';
}

module.exports = router;
