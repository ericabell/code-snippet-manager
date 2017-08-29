var express = require('express');
var router = express.Router();

let Snippet = require('../models/snippet.js');

let SnippetController = require('../controllers/snippet-controller')

/* MAIN PAGE - VIEW ALL SNIPPETS */
router.get('/', function(req, res, next) {
  SnippetController.getAll(req)
    .then( (data) => {
      res.render('index', data)
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



module.exports = router;
