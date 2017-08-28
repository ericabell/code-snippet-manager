let snippets = document.querySelectorAll('.snippet');

let codeMirrorList = [];

snippets.forEach( (snippet) => {
  let cm_options = {
    readOnly: false,
    lineNumbers: true,
    mode: {name: snippet.classList[0],}
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
