const mongoose = require('mongoose');
ObjectId = require('mongodb').ObjectID;

mongoose.Promise = require('bluebird');

const snipSchema = new mongoose.Schema({
  title: String,
  code: String,
  owner: String,
  notes: [],
  language: String,
  tags: [],
  stars: [],
  created: Date,
  modified: Date
});

const Snip = mongoose.model('Snip', snipSchema);

module.exports = Snip;
