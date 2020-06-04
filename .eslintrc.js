module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],

  parserOptions: {
    parser: 'babel-eslint'
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'array-callback-return': 1,
    'arrow-parens': [
      'error',
      'as-needed'
    ],
    'consistent-return': 0,
    camelcase: 0,
    eqeqeq: 0,
    'func-names': 0,
    'global-require': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    indent: 'off',
    'linebreak-style': 0,
    'max-len': 0,
    'no-unused-vars': 1,
    'no-redeclare': 1,
    'no-use-before-define': 1,
    'no-unused-expressions': 0,
    'no-restricted-syntax': 1,
    'no-plusplus': 1,
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'no-nested-ternary': 0,
    'no-else-return': 0,
    'no-shadow': [
      1,
      {
        allow: [
          'resolve',
          'reject',
          'done',
          'cb'
        ]
      }
    ],
    'no-return-assign': 0,
    'no-undef': 0,
    quotes: 0,
    'dot-notation': 0,
    'prefer-rest-params': 1,
    'prefer-arrow-callback': 0,
    'prefer-const': 1,
    semi: 1,
    singleQuote: 0,
    'template-curly-spacing': 'off',
    'space-before-function-paren': [
      1,
      {
        anonymous: 'always',
        named: 'always',
        asyncArrow: 'never'
      }
    ]
  },

  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ]
}
