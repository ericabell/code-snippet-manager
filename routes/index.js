var express = require('express');
var router = express.Router();

let snippets = [
    {
      id: 11111111,
    title: 'Code Snippet 1',
    code: `
def doesNothing():
  pass

class ExampleClass(ParentClass):
  @staticmethod
  def example(inputStr):
      a = list(inputStr)
      a.reverse()
      return ''.join(a)

  def __init__(self, mixin = 'Hello'):
      self.mixin = mixin

    `,
    language: 'python',
  },
  {
    id: 22222222,
  title: 'Code Snippet 2',
  code: `
<html>
<head>
</head>
<body>
</body>
</html>
  `,
  language: 'xml',
  },
  {
    id: 33333333,
title: 'Code Snippet 3',
code: `
let a = 5;
function add(a,b) {
console.log('a*b is: ' + a*b);
}
  `,
  language: 'javascript',
  },
  {
    id: 44444444,

  title: 'Code Snippet 4',
  code: `
let a = 5;
function add(a,b) {
console.log('a*b is: ' + a*b);
}
  `,
  language: 'javascript',
  }
];



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Code Snip Manager', editors: snippets.length, snippets: snippets });
});

module.exports = router;
