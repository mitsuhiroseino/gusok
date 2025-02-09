const fs = require('fs-extra');
const { posix } = require('path');
const isMatchingPath = require('./isMatchingPath');

const EXPORTS = {
  exportAll: (name) => `export * from './${name}';`,
  exportAllAs: (name) => `export * as ${name} from './${name}';`,
  exportDefault: (name) => `export { default } from './${name}';`,
  exportDefaultAs: (name) => `export { default as ${name} } from './${name}';`,
  exportTypeAll: (name) => `export type * from './${name}';`,
};
const DEFAULT_INCLUDE = [
  {
    valueType: 'base',
    entryType: 'file',
    conditions: /^[^_].*\.(ts|tsx|js|jsx)$/i,
  },
  {
    valueType: 'name',
    entryType: 'dir',
    conditions: /^[^_].*/,
  },
];
function indexes(targetPath, options = {}) {
  const {
    indexFileName = 'index.ts',
    include = DEFAULT_INCLUDE,
    exclude = [],
    exportAll = [],
    exportTypeAll = [],
    ...rest
  } = options;
  exportAll.push({
    valueType: 'name',
    entryType: 'file',
    conditions: 'constants',
  });
  exportTypeAll.push({
    valueType: 'name',
    entryType: 'file',
    conditions: 'types',
  });
  _indexes(targetPath, {
    indexFileName,
    include,
    exclude,
    exportAll,
    exportTypeAll,
    ...rest,
  });
}
function _indexes(targetPath, options, parentName) {
  const {
    indexFileName,
    include,
    exclude,
    exportAll,
    exportAllAs,
    exportDefault,
    exportDefaultAs,
    exportTypeAll,
    dryRun,
  } = options;
  const stat = fs.statSync(targetPath);
  if (!stat.isDirectory()) {
    console.error(`"${targetPath}" is not directory.`);
  }
  const items = fs.readdirSync(targetPath);
  items.sort();
  const index = [];
  for (const item of items) {
    const itemPath = posix.join(targetPath, item);
    const { name } = posix.parse(itemPath);
    const stat = fs.statSync(itemPath);
    let children;
    if (stat.isDirectory()) {
      children = _indexes(itemPath, options, name);
    }
    if (
      item !== indexFileName &&
      isMatchingPath(itemPath, include) &&
      !isMatchingPath(itemPath, exclude)
    ) {
      if (isMatchingPath(itemPath, exportAll)) {
        index.push(EXPORTS.exportAll(name));
      } else if (isMatchingPath(itemPath, exportAllAs)) {
        index.push(EXPORTS.exportAllAs(name));
      } else if (isMatchingPath(itemPath, exportDefault)) {
        index.push(EXPORTS.exportDefault(name));
      } else if (isMatchingPath(itemPath, exportDefaultAs)) {
        index.push(EXPORTS.exportDefaultAs(name));
      } else if (isMatchingPath(itemPath, exportTypeAll)) {
        index.push(EXPORTS.exportTypeAll(name));
      } else if (stat.isFile()) {
        if (name === parentName) {
          index.push(EXPORTS.exportDefault(name));
        } else {
          index.push(EXPORTS.exportDefaultAs(name));
        }
      } else if (stat.isDirectory()) {
        if (item[0] === item[0].toLowerCase()) {
          if (children.some((child) => child.split('.')[0] === item)) {
            index.push(EXPORTS.exportDefaultAs(name));
          } else {
            index.push(EXPORTS.exportAllAs(name));
          }
        } else {
          index.push(EXPORTS.exportDefaultAs(name));
        }
      }
    }
  }
  if (index.length) {
    const indexPath = posix.join(targetPath, indexFileName);
    if (!dryRun) {
      fs.writeFileSync(indexPath, index.join('\r\n') + '\r\n', {
        encoding: 'utf8',
      });
      console.info(indexPath);
    } else {
      console.info(indexPath + '-------------------------------------');
      console.info(index.join('\r\n') + '\r\n');
    }
  }
  return items;
}

indexes(process.argv[2]);
