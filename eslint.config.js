const expo = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-config-prettier');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
  ...expo,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  prettierConfig,
  {
    ignores: ['.expo/*', 'node_modules/*', 'dist/*', 'build/*', 'web-build/*'],
  },
  {
    rules: {
      // Custom lint rules and overrides
    },
  },
];
