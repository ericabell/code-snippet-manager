const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

let Snippet = require('./snippet');

mongoose.Promise = require('bluebird');

const ratingSchema = new mongoose.Schema({
  snipId: ObjectId,
  username: String,
  stars: Number
}, {collection: 'ratings'});

ratingSchema.methods.updateAverage = function() {
  let p = new Promise( (resolve, reject) => {
    let total = 0;
    let numberOfRatedSnippets;
    // find all ratings that have this instance's snipId
    this.model('Rating').find({snipId: this.snipId})
    .then((docs) => {
      numberOfRatedSnippets = docs.length;
      docs.forEach( (doc) => {
        total += doc.stars;
      })
      let averageForThisSnippet = total/numberOfRatedSnippets;
      // now I need to update the snippet document
      Snippet.findOne({'_id': this.snipId}, (err, snippet) => {
        snippet.averageRating = averageForThisSnippet.toFixed(1);

        snippet.save( (err) => {
          if(err) {
            reject(err);
          } else {
            resolve();
          }
        })
      })
    })
  })
  return p;
}

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
