let Rating = require('../models/ratings');
let Utilities = require('./utilities');

let ObjectId = require('mongodb').ObjectId



function createNewRating(id,username,stars) {
  let p = new Promise( (resolve, reject) => {

    Rating.create({
                  snipId: ObjectId(id),
                  username: username,
                  stars: stars
    })
        .then( (doc) => {
          resolve(doc);
        })
        .catch( (err) => {
          reject(err);
        })
  })

  return p;
}

function getAverageRatingForSnippet(id) {
  console.log('In getAverageRatingForSnippet');
  let p = new Promise( (resolve, reject) => {
    let total = 0;
    let numberOfRatings = 0;
    let averageRating = null;
    // find all the records with a matching snippet id
    Rating.find({snipId: ObjectId(id)})
      .then( (docs) => {
        numberOfRatings = docs.length;
        docs.forEach( (doc) => {
          total += doc.stars;
        })
        averageRating = total / numberOfRatings;
        resolve(averageRating);
      })
      .catch( () => {
        reject('error in getting the average rating')
      })
  })
  return p;
}



let RatingController = {
  createNew: createNewRating,
  getAverageRatingForSnippet: getAverageRatingForSnippet
}

module.exports = RatingController;
