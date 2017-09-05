
// SET UP FOR CODEMIRROR ON ALL TEXT AREAS

// .snippet is class on <textarea>
let snippets = document.querySelectorAll('.snippet');

// make a list of all the codemirror instances on the page
let codeMirrorList = [];

snippets.forEach( (snippet) => {
  // we may or may not have a predefined language...
  let modeName = snippet.classList[0] || '';

  console.log(snippet.classList[1] === 'readOnly');
  console.log(document.location.pathname.split('/')[2] === 'update');

  // if we're not on the update page or the class is readOnly,
  // set the options for codemirror approriately
  let cm_options = {
    readOnly: snippet.classList[1] === 'readOnly' ||
              !(document.location.pathname.split('/')[2] === 'update'),
    lineNumbers: true,
    mode: {name: modeName,}
  }
  // console.log(cm_options);
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

// set up th Add Tag button to add another text input for an additional tag
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


// for our star rating, set up the event listeners.
// the .rating class is a div around the stars
let ratings = document.querySelectorAll('.rating');

ratings.forEach( (rating) => {
  rating.addEventListener( 'click', (e) => {
    // here's where we need to find the id for the stars
    let snippetId = (e.path[6].id);
    let starNumber = e.path[0].classList[0];
    addStarRatingToSnippet(starNumber, snippetId);
  })
});

// send the star rating with the snippetId to the server
// I send credentials along with this request to know who
// the user is.
function addStarRatingToSnippet(starNumber, snippetId) {
  console.log(`I want to assign ${starNumber} stars to ${snippetId}`);

  let displayUserRating = document.querySelector('#' + snippetId + ' .display-user-rating');
  displayUserRating.innerHTML = `${starNumber} rating received!`;
  setTimeout( ()=> {
    displayUserRating.innerHTML = '';
  }, 5000);

  fetch(`http://localhost:3000/rating/${snippetId.replace('snipId-','')}/${starNumber}`, {
    method: 'GET',
    credentials: 'include'
  })
    .then( (response) => {
      return response.json();
    })
    .then( (newAverageRating) => {
      console.log(`Computed new average for snippet: ${newAverageRating.newAverage}`);
      // now we need to update THIS SNIPPET'S average rating text
      let averageRatingSpan = document.querySelector('#' + snippetId + ' .average-rating span');
      console.log(`Looking to update: ${averageRatingSpan}`);
      // update the number
      averageRatingSpan.innerHTML = newAverageRating.newAverage;

      // this might be the first rating for the snippet. If so, we should remove the hidden class
      // so that the user can see the average rating
      averageRatingSpan.parentNode.classList.remove("hidden");
    })
    .catch( (err) => {
      console.log(err);
    })

  return true;
}
