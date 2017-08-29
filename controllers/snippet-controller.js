let Snippet = require('../models/snippet');
let Utilities = require('./utilities');

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

let SnippetController = {
  getAll: getAllSnippets,
  createNew: createNewSnippet,
}

module.exports = SnippetController;
