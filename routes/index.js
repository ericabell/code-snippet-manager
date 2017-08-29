var express = require('express');
var router = express.Router();

let Snippet = require('../models/snippet.js');

let SnippetController = require('../controllers/snippet-controller');
let Utilities = require('../controllers/utilities');

/* MAIN PAGE - VIEW ALL SNIPPETS */
router.get('/', function(req, res, next) {
  SnippetController.getAll()
    .then( (data) => {
      res.render('index', {
        snippets: data,
        title: 'Code Snip Manager',
        user: Utilities.getNameFromReq(req)
      })
    })
    .catch( (err) => {
      res.render(err);
    })
});

router.get('/snip/create', function(req,res,next) {
  res.render('create', { title: 'Code Snip Manager',
                         user: Utilities.getNameFromReq(req)
                          });
});

router.post('/snip/create', function(req, res, next) {
  console.log(req.body);
  SnippetController.createNew(req)
    .then( () => {
      res.redirect('/');
    })
    .catch( (err) => {
      res.send(`Error creating snippet: ${err}`);
    })
});



module.exports = router;
