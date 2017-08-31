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
      console.log(data);
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
})

router.get('/search/tag/:tag', function(req, res, next) {
  res.redirect('/snip/tag/' + req.params.tag);
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

// router.get('/rating/average/:id', function(req, res, next) {
//   console.log('hit get route for average rating');
//   RatingController.getAverageRatingForSnippet(req.params.id)
//   .then( (data) => {
//     res.json({rating: data});
//   })
// })


router.get('/rating/:id/:stars', function(req, res, next) {
  console.log(req.user);

  console.log(`Want to give ${req.params.id} a rating of ${req.params.stars} stars by user: ${Utilities.extractUsername(req)}`);

  RatingController.createNew( req.params.id, Utilities.extractUsername(req), req.params.stars)
  .then( (data) => {
    data.updateAverage()
    .then( () => {
      console.log('update average success!');
    })
  })
  .catch( (err) => {

  })

  res.send('success');
})


module.exports = router;
