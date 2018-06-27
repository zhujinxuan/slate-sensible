const {resolve} = require('path');

module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "gitbook"
  ],
  "rules": {
    "no-param-reassign": 0,
    "import/no-commonjs": 2,
    "padding-line-between-statements": [
      "error",
      { "blankLine": "always", "prev": "multiline-expression", "next": "*" },
      { "blankLine": "any", "prev": "multiline-expression", "next": "return" },
      { "blankLine": "always", "prev": "*", "next": "multiline-expression" },
      { "blankLine": "always", "prev": "*", "next": "multiline-expression" },
      { "blankLine": "any", "prev": "empty", "next": "multiline-expression" },
      { "blankLine": "always", "prev": "multiline-block-like", "next": "*" },
      { "blankLine": "any", "prev": "multiline-block-like", "next": "return" },
      { "blankLine": "always", "prev": "*", "next": "multiline-block-like" },
      { "blankLine": "always", "prev": "*", "next": "multiline-block-like" },
      { "blankLine": "any", "prev": "case", "next": "case" }
    ]
  },
  "plugins": [
    "flowtype"
  ],
  "env": {
    "jest": true
  },
  "settings": {
    "react": {
      "version": "16.4",
      "flow": " 0.75.0"
    },
    'import/resolver': {
      'eslint-import-resolver-lerna': {
        'packages': resolve(__dirname, 'packages')
      }
    }
  }
}
