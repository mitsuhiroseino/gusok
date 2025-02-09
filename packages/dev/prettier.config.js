/** @type {import("prettier").Config} */
const config = {
  arrowParens: 'always',
  semi: true,
  useTabs: false,
  tabWidth: 2,
  bracketSpacing: true,
  singleQuote: true,
  printWidth: 80,
  trailingComma: 'all',
  endOfLine: 'auto',
  organizeImportsSkipDestructiveCodeActions: true,
  plugins: ['prettier-plugin-organize-imports'],
};
module.exports = config;
