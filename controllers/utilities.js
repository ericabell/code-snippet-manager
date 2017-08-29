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

let Utilities = {
  getNameFromReq: extractName,
  getUsernameFromReq: extractUsername
}

module.exports = Utilities;
