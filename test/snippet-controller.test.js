let request = require('supertest');

let SnippetController = require('../controllers/snippet-controller');

describe('Snippet Controller Tests', () => {
    test("basic", function() {
      let getAllResult = SnippetController.getAll();
      expect( getAllResult.editors ).toBeTruthy();
    });
})
