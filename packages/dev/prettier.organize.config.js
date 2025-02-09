const normal = require('./prettier.config');

/** @type {import("prettier").Config} */
const config = {
  ...normal,
  organizeImportsSkipDestructiveCodeActions: false,
};
module.exports = config;
