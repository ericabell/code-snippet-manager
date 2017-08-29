let Snippet = require('../models/snippet');
let Utilities = require('./utilities');

function getAllSnippets() {
  let p = new Promise( (resolve, reject) => {
    Snippet.find({})
      .then( (snippets) => {
        resolve ({
          editors: snippets.length,
          snippets: snippets,
        });
      })
      .catch( (err) => {
        reject(err);
      })
  })

  return p;
}

function createNewSnippet(req) {
  let p = new Promise( (resolve, reject) => {
    let newTitle = req.body.title;
    let newLanguage = req.body.language;
    let newCode = req.body.code;
    let newTags = req.body.tags;

    Snippet.create({title: newTitle,
                    language: newLanguage,
                    code: newCode,
                    owner: Utilities.getUsernameFromReq(req),
                    tags: newTags
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
