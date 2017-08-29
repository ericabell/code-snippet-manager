let Snippet = require('../models/snippet');

function getAllSnippets(req) {
  let p = new Promise( (resolve, reject) => {
    Snippet.find({})
      .then( (snippets) => {
        resolve ({
          title: 'Code Snip Manager',
          editors: snippets.length,
          snippets: snippets,
          user: extractName(req)
        });
      })
      .catch( (err) => {
        reject(err);
      })
  })

  return p;
}


// HELPER FUNCTIONS
// extractName checks to see if current user is authenticated,
// if they are, return their name. If not, return Anonymous user
function extractName (req) {
  if( req.user ) {
    return req.user.name;
  }
  return 'Anonymous User';
}

function extractUsername(req) {
  if( req.user ) {
    return req.user.username;
  }
  return 'anonymous';
}

let SnippetController = {getAll: getAllSnippets}

module.exports = SnippetController;
