let Utilities = require('../routes/utilities');

describe('Helper Function Tests', () => {
  test('extractName', function() {
    let req = {
      user: {
        name: 'Bob Tway'
      }
    };
    expect(Utilities.extractName(req)).toBe('Bob Tway');
  })

  test('extractUsername', function() {
    let req = {
      user: {
        name: 'Bob Tway',
        username: 'btway'
      }
    };
    expect(Utilities.extractUsername(req)).toBe('btway');
  })

  test('extractUsernameAnon', function() {
    let req = {};
    expect(Utilities.extractUsername(req)).toBe('anonymous');
  })

  test('extractUsernameAnon', function() {
    let req = {};
    expect(Utilities.extractName(req)).toBe('Anonymous User');
  })

})
