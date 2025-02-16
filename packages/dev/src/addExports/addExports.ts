import fs from 'fs-extra';
import { posix as path } from 'path';
import isMatchingPath from '../isMatchingPath';
import { AddExportsOptions } from './types';

/**
 * index.tsが配置されているモジュールをpackage.jsonのexportsに追加する
 * @param targetPath
 * @param options
 */
export default function addExports(
  targetPath: string = 'src',
  options: AddExportsOptions = {},
) {
  let {
    packageJsonPath = 'package.json',
    include = [],
    dryRun,
    ...rest
  } = options;

  // 処理対象を設定
  include = [
    // indexファイルを対象
    {
      valueType: 'base',
      entryType: 'file',
      conditions: /^index.(ts|tsx)$/i,
    },
    ...include,
  ];

  // exportsをpackage.jsonに追加
  const exportsIndex = _addExports(targetPath, {
    packageJsonPath,
    include,
    ...rest,
  });

  const packageJson = fs.readJsonSync(packageJsonPath, { encoding: 'utf8' });
  packageJson.exports = {};
  exportsIndex.sort((a, b) => (a.key > b.key ? 1 : -1));
  for (const index of exportsIndex) {
    packageJson.exports[index.key ? './' + index.key : '.'] =
      './' + index.path + '.js';
  }
  if (dryRun) {
    console.log(packageJson);
  } else {
    fs.writeJsonSync(packageJsonPath, packageJson, {
      encoding: 'utf8',
      spaces: 2,
    });
  }
}

function _addExports(
  targetPath: string,
  options: AddExportsOptions,
  current: string = '',
) {
  const { include, exclude } = options;

  const stat = fs.statSync(targetPath);
  if (!stat.isDirectory()) {
    console.error(`"${targetPath}" is not directory.`);
  }
  const items = fs.readdirSync(targetPath);
  items.sort();
  const exportsIndex: { key: string; path: string }[] = [];

  for (const item of items) {
    const itemPath = path.join(targetPath, item);
    const stat = fs.statSync(itemPath);
    const { name } = path.parse(itemPath);

    if (stat.isDirectory()) {
      // ディレクトリの場合は先に子要素を処理
      exportsIndex.push(
        ..._addExports(itemPath, options, path.join(current, item)),
      );
    } else if (
      stat.isFile() &&
      isMatchingPath(itemPath, include) &&
      !isMatchingPath(itemPath, exclude)
    ) {
      // exportの対象の場合
      exportsIndex.push({
        key: current,
        path: path.join('build', current, name),
      });
    }
  }

  return exportsIndex;
}
