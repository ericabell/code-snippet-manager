let snippets = document.querySelectorAll('.snippet');

let codeMirrorList = [];

snippets.forEach( (snippet) => {
  // we may or may not have a predefined language...
  let modeName = snippet.classList[0] || '';
  let cm_options = {
    readOnly: false,
    lineNumbers: true,
    mode: {name: modeName,}
  }
  console.log(cm_options);
  codeMirrorList.push(new CodeMirror
    .fromTextArea(snippet, cm_options)
    .on('changes', (cmInstance, changes) => {
      console.log('changes');
      console.dir(cmInstance);
      // console.dir(changes);
      // console.log(cmInstance.getValue());
    })
  );
})


let addTagButton = document.querySelector('#add-tag-button');

if( addTagButton ) {
  addTagButton.addEventListener('click', (e) => {
    console.log(`User clicked add tag`);
    // append another text input to the group
    let tagFormGroup = document.querySelector('#tag-form-group');
    let newTextInputElement = document.createElement('input');
    newTextInputElement.classList = 'form-control';
    newTextInputElement.type = 'text';
    newTextInputElement.name = 'tags';
    tagFormGroup.appendChild(newTextInputElement);
  })
}


// the star ratings

// each snippet has a div with class of rating and an id for the snippet
// let snippetsStarRating = document.querySelectorAll('.rating');
//
// console.log(`Length of snippetsStarRating: ${snippetsStarRating.length}`);
//
// let el = snippetsStarRating[0];
// let currentRating = 0;
// let maxRating = 5;
// let callback = function( rating ) { alert(rating);};
//
// rating(el, currentRating, maxRating, callback);

// snippetsStarRating.forEach( (snippet) => {
//   let el = snippet;
//   let currentRating = 0;
//   let maxRating = 5;
//   let callback = function( rating ) {alert(rating);};
//
//   let myRating = rating(el, currentRating, maxRating, callback);
// })

// the star ratings with class

// the div has class 'rating' and id corresponding to the snippet
// each star has class="5", class="4", etc.

let ratings = document.querySelectorAll('.rating');

ratings.forEach( (rating) => {
  rating.addEventListener( 'click', (e) => {
    let snippetId = e.path[1].id;
    let starNumber = e.path[0].classList[0];
    addStarRatingToSnippet(starNumber, snippetId);
  })
});

function addStarRatingToSnippet(starNumber, snippetId) {
  console.log(`I want to assign ${starNumber} stars to ${snippetId}`);

  fetch(`http://localhost:3000/rating/${snippetId}/${starNumber}`, {
    method: 'GET',
    credentials: 'include'
  })
    .then( () => {
      // grab the new average rating so we can display it
      fetch(`http://localhost:3000/rating/average/${snippetId}`, {
        method: 'GET',
        credentials: 'include'
      })
      .then( (response) => {
        return response.json()
      })
      .then( (json) => {
        console.log(json);
      })
    })
    .catch( (err) => {
      console.log(err);
    })


  return true;
}
