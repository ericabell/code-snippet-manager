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



let RatingController = {
  createNew: createNewRating
}

module.exports = RatingController;
