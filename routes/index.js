var express = require('express');
var router = express.Router();

let Snippet = require('../models/snippet.js');

let SnippetController = require('../controllers/snippet-controller');

/* MAIN PAGE - VIEW ALL SNIPPETS */
router.get('/', function(req, res, next) {
  SnippetController.getAll()
    .then( (data) => {
      res.render('index', {
        snippets: data,
        title: 'Code Snip Manager',
        user: extractName(req)
      })
    })
    .catch( (err) => {
      res.render(err);
    })
});

router.get('/snip/language/:language', function(req, res, next) {
  let searchLanguage = req.params.language;
  SnippetController.getByLanguage(searchLanguage)
    .then( (data) => {
      res.render('index', {
        snippets: data,
        title: 'Code Snip Manager',
        user: extractName(req)
      })
    })
    .catch( (err) => {
      res.render(err);
    })
});


router.get('/snip/create', function(req,res,next) {
  res.render('create', { title: 'Code Snip Manager',
                         user: extractName(req)
                          });
});

router.post('/snip/create', function(req, res, next) {
  console.log(req.body);

  SnippetController.createNew(req.body.title,
                              req.body.language,
                              req.body.code,
                              extractName(req),
                              req.body.tags,
                              req.body.notes)
    .then( () => {
      res.redirect('/');
    })
    .catch( (err) => {
      res.send(`Error creating snippet: ${err}`);
    })
});

// HELPER FUNCTIONS
// extractName checks to see if current user is authenticated,
// if they are, return their name. If not, return Anonymous user
function extractName (req) {
  if( req.user ) {
    return req.user.name;
  }
  return 'Anonymous User';
}

function extractUsername(req) {
  if( req.user ) {
    return req.user.username;
  }
  return 'anonymous';
}

module.exports = router;
