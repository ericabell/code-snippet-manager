const mongoose = require('mongoose');
ObjectId = require('mongodb').ObjectID;

mongoose.Promise = require('bluebird');

const ratingSchema = new mongoose.Schema({
  snipId: ObjectId,
  username: String,
  stars: Number
}, {collection: 'ratings'});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
