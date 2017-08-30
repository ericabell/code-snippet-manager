let request = require('supertest');

const mongoose = require('mongoose');
let SnippetController = require('../controllers/snippet-controller');

let url='mongodb://localhost:27017/code-snippet-manager-project';
mongoose.connect(url,
                 {useMongoClient: true},
                 (err)=> {
                   if(err) throw err;
                   else {console.log('connection to db successful');}
                 });

describe('Snippet Controller Tests', () => {
    test("Get All Snippets", function() {
      SnippetController.getAll()
        .then( (data) => {
          expect(data).toBeTruthy();
        })
        .catch( (err) => {
          throw err
        })
    });

    test("Create a Snippet", function() {
      SnippetController.createNew('title',
                                  'language',
                                  'code',
                                  'owner',
                                  'tags',
                                  ['notes'],
                                  Date()
                                )
          .then( (data) => {
            expect(data).toBeTruthy();
          })
    });

    test("Find Snippets by Language", function() {
      SnippetController.getByLanguage('javascript')
        .then( (data) => {
          expect(data).toBeTruthy();
        })
    })
})
