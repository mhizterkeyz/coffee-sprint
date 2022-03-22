module.exports = {
  plugins: ['prettier', 'import'],
  extends: ['airbnb-base', 'prettier', 'eslint:recommended'],
  root: true,
  env: {
    node: true,
    es6: true,
  },
  rules: {
    'prettier/prettier': ['error'],
    'import/no-unresolved': ['error'],
    'import/no-cycle': ['error'],
    'import/extensions': [0, 'ignorePackages', { json: 'always', js: 'never' }],
    'import/prefer-default-export': ['off'],
    'import/no-extraneous-dependencies': ['error'],
    'no-useless-constructor': ['off'],
    'class-methods-use-this': ['off'],
    'no-underscore-dangle': 'off',
    'no-param-reassign': ['error'],
    'no-empty-function': ['error'],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};
