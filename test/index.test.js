let request = require('supertest');
let test = require('tape');

let app = require('../app');


test('First test!', function(t) {
  t.end();
});

test('Main page request', function(t) {
  request(app)
    .get('/')
    .expect(200)
    .end( function(err,res) {
      t.error( err, 'No error');
      t.end();
    });
});
