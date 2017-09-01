var express = require('express');
var router = express.Router();

let Snippet = require('../models/snippet.js');
let Rating = require('../models/ratings.js')

let SnippetController = require('../controllers/snippet-controller');
let RatingController = require('../controllers/rating-controller');

let Utilities = require('./utilities');

/* ALL THE API ENDPOINTS PREFIX: /api/ */

// api route to get all snips as json
router.get('/snip', function(req, res, next) {
  res.send('test api route');
});

// api route to create a new snip from json data
router.post('/snip', function(req, res, next) {

});

// api route to get a specific snip
router.get('/snip/:id', function(req, res, next) {

});

// api route to modify an existing snip
router.post('/snip/:id', req, res, next) {

});



module.exports = router;
