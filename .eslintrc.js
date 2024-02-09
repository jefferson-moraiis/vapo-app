/* eslint-disable no-bitwise */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
    'no-param-reassign': 0,
    'import/prefer-default-export': [
      ('off' | 'warn' | 'error'),
      { target: 'single' | 'any' },
    ],
    'react/react-in-jsx-scope': 'off',
    indent: ['error', 2],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 0,
    'jsx-a11y/anchor-is-valid': [
      'off',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'react/no-array-index-key': 'off',
    'max-len': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'react/jsx-filename-extension': 'off',
    'react/function-component-definition': 'off',
    'react/no-unknown-property': 'off',
  },
};
