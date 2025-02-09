import * as fs from 'fs-extra';
import { posix as path } from 'path';
import isMatchingPath, { IsMatchingPathCondition } from '../isMatchingPath';
import { IndexesOptions } from './types';

const EXPORTS = {
  exportAll: (name) => `export * from './${name}';`,
  exportAllAs: (name) => `export * as ${name} from './${name}';`,
  exportDefault: (name) => `export { default } from './${name}';`,
  exportDefaultAs: (name) => `export { default as ${name} } from './${name}';`,
  exportTypeAll: (name) => `export type * from './${name}';`,
};

// デフォルトのindex対象
const DEFAULT_INCLUDE: IsMatchingPathCondition[] = [
  {
    valueType: 'base',
    entryType: 'file',
    conditions: /^[^_].*\.(ts|tsx|js|jsx)$/i,
  },
  { valueType: 'name', entryType: 'dir', conditions: /^[^_].*/ },
];

export default function indexes(
  targetPath: string,
  options: IndexesOptions = {},
) {
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

function _indexes(
  targetPath: string,
  options: IndexesOptions,
  parentName?: string,
) {
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
    const itemPath = path.join(targetPath, item);
    const { name } = path.parse(itemPath);
    const stat = fs.statSync(itemPath);

    let children;
    if (stat.isDirectory()) {
      // ディレクトリの場合は先に子要素を処理
      children = _indexes(itemPath, options, name);
    }

    if (
      item !== indexFileName &&
      isMatchingPath(itemPath, include) &&
      !isMatchingPath(itemPath, exclude)
    ) {
      // 処理対象外ではない場合
      if (isMatchingPath(itemPath, exportAll)) {
        // export * from './abc';
        index.push(EXPORTS.exportAll(name));
      } else if (isMatchingPath(itemPath, exportAllAs)) {
        // export * as abc from './abc';
        index.push(EXPORTS.exportAllAs(name));
      } else if (isMatchingPath(itemPath, exportDefault)) {
        // export { default } from './abc';
        index.push(EXPORTS.exportDefault(name));
      } else if (isMatchingPath(itemPath, exportDefaultAs)) {
        // export { default as abc } from './abc';
        index.push(EXPORTS.exportDefaultAs(name));
      } else if (isMatchingPath(itemPath, exportTypeAll)) {
        // export type * from './abc';
        index.push(EXPORTS.exportTypeAll(name));
      } else if (stat.isFile()) {
        // ファイルの場合
        // ファイルのルールに従ってexportを設定
        if (name === parentName) {
          // 拡張子を除いたファイル名が親ディレクトリ名と同じ場合
          index.push(EXPORTS.exportDefault(name));
        } else {
          index.push(EXPORTS.exportDefaultAs(name));
        }
      } else if (stat.isDirectory()) {
        // ディレクトリの場合
        // ディレクトリのルールに従ってexportを設定
        if (item[0] === item[0].toLowerCase()) {
          // ディレクトリ名の先頭が小文字の場合
          if (children.some((child) => child.split('.')[0] === item)) {
            // 子要素にディレクトリ名と同じ名称のファイルがある場合
            index.push(EXPORTS.exportDefaultAs(name));
          } else {
            index.push(EXPORTS.exportAllAs(name));
          }
        } else {
          // ディレクトリ名の先頭が大文字の場合
          index.push(EXPORTS.exportDefaultAs(name));
        }
      }
    }
  }

  if (index.length) {
    const indexPath = path.join(targetPath, indexFileName);
    if (!dryRun) {
      // indexファイルの出力
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
