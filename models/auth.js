const mongoose = require('mongoose');
ObjectId = require('mongodb').ObjectID;

mongoose.Promise = require('bluebird');

const userSchema = new mongoose.Schema({
  username: String,
  hashedPassword: String,
  name: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
