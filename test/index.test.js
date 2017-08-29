let request = require('supertest');

let app = require('../app');

describe('Test GET requests to pages', () => {
    test("/", function() {
      return request(app)
        .get('/')
        .expect(200)
    });

    test("/login", function() {
      return request(app)
        .get('/login')
        .expect(200)
    });

    test("/register", function() {
      return request(app)
        .get('/register')
        .expect(200)
    });

    test("/snip/create", function() {
      return request(app)
        .get('/')
        .expect(200)
    })
})
