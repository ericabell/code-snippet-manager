var express = require('express');
var router = express.Router();

let Snippet = require('../models/snippet.js');
let Rating = require('../models/ratings.js')

let SnippetController = require('../controllers/snippet-controller');
let RatingController = require('../controllers/rating-controller');

let Utilities = require('./utilities');

/* MAIN PAGE - VIEW ALL SNIPPETS */
router.get('/', function(req, res, next) {
  SnippetController.getAll()
    .then( (data) => {
      res.render('index', {
        snippets: data,
        title: 'Code Snip Manager',
        user: Utilities.extractName(req),
        username: Utilities.extractUsername(req)
      })
    })
    .catch( (err) => {
      res.render(err);
    })
});

router.get('/search', function(req, res, next) {
  res.render('search', {
    title: 'Code Snip Manager',
    user: Utilities.extractName(req),
    username: Utilities.extractUsername(req)
  })
});

router.get('/search/language/:language', function(req, res, next) {
  res.redirect('/snip/lanuage/' + req.params.language);
});

router.post('/search/language', function(req,res,next) {
  res.redirect('/snip/language/' + req.body.language);
})

router.get('/snip/language/:language', function(req, res, next) {
  let searchLanguage = req.params.language;
  SnippetController.getByLanguage(searchLanguage)
    .then( (data) => {
      res.render('index', {
        snippets: data,
        title: 'Code Snip Manager',
        user: Utilities.extractName(req),
        username: Utilities.extractUsername(req)
      })
    })
    .catch( (err) => {
      res.render(err);
    })
});

router.get('/search/tag/:tag', function(req, res, next) {
  res.redirect('/snip/tag/' + req.params.tag);
});

router.post('/search/tag', function(req,res,next) {
  res.redirect('/snip/tag/' + req.body.tag);
})

router.get('/snip/tag/:tag', function(req, res, next) {
  let searchTag = req.params.tag;
  SnippetController.getByTag(searchTag)
    .then( (data) => {
      res.render('index', {
        snippets: data,
        title: 'Code Snip Manager',
        user: Utilities.extractName(req),
        username: Utilities.extractUsername(req)
      })
    })
    .catch( (err) => {
      res.render(err);
    })
});

router.get('/snip/user/:username', function(req,res,next) {
  let searchUser = req.params.username;
  SnippetController.getByUser(searchUser)
    .then( (data) => {
      res.render('index', {
        snippets: data,
        title: 'Code Snippet Manager',
        user: Utilities.extractName(req),
        username: Utilities.extractUsername(req)
      })
    })
    .catch( (err) => {
      res.render(err);
    })
})

router.get('/snip/create', function(req,res,next) {
  res.render('create', { title: 'Code Snip Manager',
                         user: Utilities.extractName(req),
                         username: Utilities.extractUsername(req)
                          });
});

router.post('/snip/create', function(req, res, next) {
  console.log(req.body);

  SnippetController.createNew(req.body.title,
                              req.body.language,
                              req.body.code,
                              Utilities.extractUsername(req),
                              req.body.tags,
                              req.body.notes)
    .then( () => {
      res.redirect('/');
    })
    .catch( (err) => {
      res.send(`Error creating snippet: ${err}`);
    })
});

router.get('/snip/view/:id', function(req,res,next) {
  let searchId = req.params.id;

  SnippetController.getById(searchId)
    .then( (data) => {
      res.render('index', {
        snippets: data,
        title: 'Code Snip Manager',
        user: Utilities.extractName(req),
        username: Utilities.extractUsername(req)
      })
    })
    .catch( (err) => {
      res.render(err);
    })
});

router.get('/snip/update/:id', function(req,res,next) {
  let searchId = req.params.id;

  SnippetController.getById(searchId)
    .then( (data) => {
      res.render('edit', {
        snippets: data,
        title: 'Code Snip Manager',
        user: Utilities.extractName(req),
        username: Utilities.extractUsername(req)
      })
    })
    .catch( (err) => {
      res.render(err);
    })
});

router.post('/snip/update/:id', function(req, res, next) {
  SnippetController.updateSnippetById(req.params.id,
                              req.body.title,
                              req.body.language,
                              req.body.code,
                              Utilities.extractUsername(req),
                              req.body.tags,
                              req.body.notes)
    .then( () => {
      res.redirect('/');
    })
    .catch( (err) => {
      res.send(`Error updating snippet: ${err}`);
    })
})

router.get('/snip/delete/:id', function(req,res,next) {
  let searchId = req.params.id;

  SnippetController.deleteById(searchId)
    .then( (data) => {
      res.redirect('/');
    })
    .catch( (err) => {
      res.render(err);
    })

});

router.get('/rating/:id/:stars', function(req, res, next) {
  // when a user clicks a star, this route is called
  // we don't want them to wait, so create the new ratings
  // document and then update the average in the snippet
  // *BUT* res.send('success') doesn't wait for those db
  // queries to finish.
  RatingController.createNew(
                              req.params.id,
                              Utilities.extractUsername(req),
                              req.params.stars
                            )
  .then( (data) => {
    data.updateAverage()
    .then( (newAverage) => {
      console.log(`New average received from ratings instance method: ${newAverage}`);
      // send the new average back to the client JS caller
      res.json({newAverage: newAverage});
    })
  })
  .catch( (err) => {
    console.log(`Error updating snippet average rating: ${err}`);
    res.send('error?');
  })
})


module.exports = router;
