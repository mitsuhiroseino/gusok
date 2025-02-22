import fs from 'fs-extra';
import { posix as path } from 'path';
import isMatchingPath from '../isMatchingPath';
import {
  DEFAULT_EXCLUDE,
  DEFAULT_EXPORT_ALL,
  DEFAULT_EXPORT_ALL_AS,
  DEFAULT_EXPORT_DEFAULT,
  DEFAULT_EXPORT_TYPE_ALL,
  DEFAULT_INCLUDE,
} from './constants';
import { IndexesOptions } from './types';

const EXPORTS = {
  exportAll: {
    type: 'named',
    generate: (name) => `export * from './${name}';`,
  },
  exportAllAs: {
    type: 'named',
    generate: (name) => `export * as ${name} from './${name}';`,
  },
  exportDefault: {
    type: 'default',
    generate: (name) => `export { default } from './${name}';`,
  },
  exportDefaultAs: {
    type: 'named',
    generate: (name) => `export { default as ${name} } from './${name}';`,
  },
  exportTypeAll: {
    type: 'type',
    generate: (name) => `export type * from './${name}';`,
  },
};

/**
 * 対象のディレクトリ配下のindexファイルを作成する\
 * 対象ファイルで出力形式が特に指定されていない場合は下記の形式で出力\
 * `export { default as ${name} } from './${name}';`
 */
export default function indexes(options: IndexesOptions = {}) {
  const {
    srcPath = 'src',
    indexFileName = 'index.ts',
    include = DEFAULT_INCLUDE,
    exclude = DEFAULT_EXCLUDE,
    exportAll = DEFAULT_EXPORT_ALL,
    exportAllAs = DEFAULT_EXPORT_ALL_AS,
    exportDefault = DEFAULT_EXPORT_DEFAULT,
    exportTypeAll = DEFAULT_EXPORT_TYPE_ALL,
    ...rest
  } = options;
  const indexRegex = _createRegex(indexFileName);

  // indexファイルの作成処理を実行
  _indexes(srcPath, indexRegex, {
    indexFileName,
    include,
    exclude,
    exportAll,
    exportAllAs,
    exportDefault,
    exportTypeAll,
    ...rest,
  });
}

function _indexes(
  targetPath: string,
  indexRegex: RegExp,
  options: IndexesOptions,
) {
  const {
    indexFileName,
    include,
    exclude,
    includeNamedWithDefault,
    exportAll,
    exportAllAs,
    exportDefault,
    exportDefaultAs,
    exportTypeAll,
    dryRun,
  } = options;
  const exportTargets = {
    exportAll,
    exportAllAs,
    exportDefault,
    exportDefaultAs,
    exportTypeAll,
  };
  const stat = fs.statSync(targetPath);
  if (!stat.isDirectory()) {
    console.error(`"${targetPath}" is not directory.`);
  }
  const items = fs.readdirSync(targetPath);
  items.sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1));
  const exportCodes = [];
  let hasDefaultExport = false;
  let hasNamedExport = false;

  for (const item of items) {
    const itemPath = path.join(targetPath, item);
    const { name } = path.parse(itemPath);
    const stat = fs.statSync(itemPath);

    let children;
    if (stat.isDirectory()) {
      // ディレクトリの場合は先に子要素を処理
      children = _indexes(itemPath, indexRegex, options);
    }
    const isMatchingPathOptions = {
      conditionOptions: { indexRegex, children },
    };

    if (
      !indexRegex.test(item) &&
      isMatchingPath(itemPath, include, isMatchingPathOptions) &&
      !isMatchingPath(itemPath, exclude, isMatchingPathOptions)
    ) {
      // indexではない場合
      let isExported = false;
      for (const exportType in EXPORTS) {
        const exportTarget = exportTargets[exportType];
        if (
          exportTarget &&
          isMatchingPath(itemPath, exportTarget, isMatchingPathOptions)
        ) {
          // 条件に一致した場合はexportのコードを生成
          const EXPORT = EXPORTS[exportType];
          exportCodes.push({
            type: EXPORT.type,
            code: EXPORT.generate(name),
          });
          // exportの種類に応じたフラグを立てる
          if (EXPORT.type === 'named') {
            hasNamedExport = true;
          } else if (EXPORT.type === 'default') {
            hasDefaultExport = true;
          }
          isExported = true;
          break;
        }
      }
      if (!isExported) {
        // 未指定の場合はexportDefaultAs
        exportCodes.push({
          type: EXPORTS.exportDefaultAs.type,
          code: EXPORTS.exportDefaultAs.generate(name),
        });
        hasNamedExport = true;
      }
    }
  }

  if (exportCodes.length) {
    let index;
    if (hasDefaultExport && hasNamedExport && !includeNamedWithDefault) {
      // デフォルトエクスポートと名前付きエクスポートの混在を許さない場合は名前付きエクスポートを除外
      index = exportCodes.reduce((result, exportCode) => {
        if (exportCode.type !== 'named') {
          result.push(exportCode.code);
        }
        return result;
      }, []);
    } else {
      index = exportCodes.map((exportCode) => exportCode.code);
    }

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

function _createRegex(str) {
  return new RegExp(
    `^${str.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&')}$`,
    'i',
  );
}
