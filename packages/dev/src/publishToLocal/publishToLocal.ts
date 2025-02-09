import * as fs from 'fs-extra';
import * as path from 'path';
import checkExistence from '../checkExistence';
import editJsonFile from '../editJsonFile';
import { PushToLocalOptions } from './types';

/**
 * ローカルのディレクトリにパッケージを公開する
 * @param packagePath ビルドされたパッケージのディレクトリのパス
 * @param localNodeModulesPath ローカルのnode_modulesディレクトリのパス
 * @param options オプション
 */
function publishToLocal(packagePath: string, localNodeModulesPath: string, options: PushToLocalOptions = {}) {
  console.info(new Date(), '@visue/dev/publishToLocal');

  const { trial, editPackageJson } = options,
    resolvedPackagePath = path.resolve(packagePath),
    resolvedPackageJsonPath = path.resolve(resolvedPackagePath, 'package.json');

  if (!checkExistence(resolvedPackagePath, resolvedPackageJsonPath)) {
    return;
  }

  console.info(`${packagePath} -> ${localNodeModulesPath}`);

  // package.jsonからパッケージ名を取得しコピー先のパスを決定
  const packageJson = fs.readJSONSync(resolvedPackageJsonPath),
    packageName = packageJson.name,
    localPackagePath = path.join(localNodeModulesPath, packageName),
    resolvedLocalPackagePath = path.resolve(localPackagePath);

  if (!trial) {
    if (fs.existsSync(localPackagePath)) {
      // 古いパッケージは削除
      fs.removeSync(localPackagePath);
    }
    // パッケージをコピー
    fs.copySync(resolvedPackagePath, resolvedLocalPackagePath);
    if (editPackageJson) {
      // package.jsonをローカル用に編集して出力する場合
      editJsonFile(path.join(resolvedLocalPackagePath, 'package.json'), editPackageJson);
    }
  }
  console.info(`${packageName} is being copied...`);
}

export default publishToLocal;
