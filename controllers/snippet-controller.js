let Snippet = require('../models/snippet');
let Utilities = require('./utilities');

let ObjectId = require('mongodb').ObjectId

function getAllSnippets() {
  let p = new Promise( (resolve, reject) => {
    Snippet.find({})
      .then( (snippets) => {
        resolve ({
          snippets: snippets
        });
      })
      .catch( (err) => {
        reject(err);
      })
  })

  return p;
}

function getByLanguage(language) {
  let p = new Promise( (resolve, reject) => {
    Snippet.find({language: language})
      .then( (snippets) => {
        resolve ({
          snippets: snippets
        });
      })
      .catch( (err) => {
        reject(err);
      })
  })

  return p;
}

function getByTag(tag) {
  let p = new Promise( (resolve, reject) => {
    Snippet.find({tags: {$in: [tag]}})
      .then( (snippets) => {
        resolve ({
          snippets: snippets
        });
      })
      .catch( (err) => {
        reject(err);
      })
  })

  return p;
}

function getByUser(user) {
  let p = new Promise( (resolve, reject) => {
    Snippet.find({owner: user})
      .then( (snippets) => {
        resolve( {
          snippets: snippets
        });
      })
      .catch( (err) => {
        reject(err);
      })
  })

  return p;
}

function getById(id) {
  let p = new Promise( (resolve, reject) => {
    Snippet.find({_id: ObjectId(id)})
      .then( (snippets) => {
        resolve( {
          snippets: snippets
        });
      })
      .catch( (err) => {
        reject(err);
      })
  })

  return p;
}

function createNewSnippet(newTitle,
                          newLanguage,
                          newCode,
                          newOwner,
                          newTags,
                          newNotes) {
  let p = new Promise( (resolve, reject) => {

    Snippet.create({title: newTitle,
                    language: newLanguage,
                    code: newCode,
                    owner: newOwner,
                    tags: newTags,
                    notes: [newNotes],
                    created: Date()
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

function deleteById(id) {
  let p = new Promise( (resolve, reject) => {
    Snippet.deleteOne({_id: ObjectId(id)})
      .then( (doc) => {
        resolve(doc);
      })
      .catch( (err) => {
        reject(err);
      })
  })

  return p;
}

let SnippetController = {
  getAll: getAllSnippets,
  createNew: createNewSnippet,
  getByTag: getByTag,
  getByLanguage: getByLanguage,
  getByUser: getByUser,
  getById: getById,
  deleteById: deleteById
}

module.exports = SnippetController;
