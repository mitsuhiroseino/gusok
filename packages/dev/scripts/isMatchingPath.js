const fs = require('fs-extra');
const isFunction = require('lodash/isFunction');
const isString = require('lodash/isString');
const { posix } = require('path');

function isMatchingPath(targetPath, conditions) {
  if (!conditions) {
    return false;
  }
  const conditionList = Array.isArray(conditions) ? conditions : [conditions];
  const posixPath = posix.normalize(targetPath);
  const values = {
    path: posixPath,
    ...posix.parse(posixPath),
  };
  for (const condition of conditionList) {
    if (_isMatching(values.path, values, condition)) {
      return true;
    }
  }
  return false;
}
function _isMatching(value, values, condition) {
  if (isString(condition)) {
    if (value.includes(condition)) {
      return true;
    }
  } else if (condition instanceof RegExp) {
    if (condition.test(value)) {
      return true;
    }
  } else if (isFunction(condition)) {
    return condition(values);
  } else {
    const { valueType = 'path', entryType = 'both', conditions } = condition;
    if (entryType !== 'both') {
      const stat = fs.statSync(values.path);
      if (
        (stat.isDirectory() && entryType !== 'dir') ||
        (stat.isFile() && entryType !== 'file')
      ) {
        return false;
      }
    }
    const conditionList = Array.isArray(conditions) ? conditions : [conditions];
    return conditionList.every((cond) =>
      _isMatching(values[valueType], values, cond),
    );
  }
  return false;
}
module.exports = isMatchingPath;
