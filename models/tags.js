const mongoose = require('mongoose');
ObjectId = require('mongodb').ObjectID;

mongoose.Promise = require('bluebird');

const tagSchema = new mongoose.Schema({
  name: String
}, {collection: 'tags'});

const Tag = mongoose.model('Snip', tagSchema);

module.exports = Tag;
