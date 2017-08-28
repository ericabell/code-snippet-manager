const mongoose = require('mongoose');
ObjectId = require('mongodb').ObjectID;

mongoose.Promise = require('bluebird');

const snippetSchema = new mongoose.Schema({
  title: String,
  code: String,
  owner: String,
  notes: [],
  language: String,
  tags: [],
  stars: [],
  created: Date,
  modified: Date
}, {collection: 'snippets'});

const Snippet = mongoose.model('Snip', snippetSchema);

module.exports = Snippet;
