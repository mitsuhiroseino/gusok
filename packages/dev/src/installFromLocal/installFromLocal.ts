import * as fs from 'fs-extra';
import reduce from 'lodash/reduce';
import * as path from 'path';
import checkExistence from '../checkExistence';
import { InstallFromLocalOptions } from './types';

/**
 * ローカルに配置されたパッケージをインストールする
 * @param localNodeModulesPath ローカルのnode_modulesディレクトリのパス
 * @param options オプション
 */
function installFromLocal(localNodeModulesPath: string, options: InstallFromLocalOptions = {}) {
  console.info(new Date(), '@visue/dev/installFromLocal');

  const { packageJsonPath = './package.json', nodeModulesPath = './node_modules', trial } = options,
    resolvedLocalNodeModulesPath = path.resolve(localNodeModulesPath),
    resolvedPackageJsonPath = path.resolve(packageJsonPath);

  if (!checkExistence(resolvedLocalNodeModulesPath, resolvedPackageJsonPath)) {
    return;
  }

  console.info(`${localNodeModulesPath} -> ${nodeModulesPath}`);

  // package.jsonからローカルのnode_modulesにあるパッケージを取得
  const packageJson = fs.readJSONSync(resolvedPackageJsonPath),
    localPackages = reduce(
      { ...packageJson.dependencies, ...packageJson.devDependencies },
      (result: Record<string, string>, value, key) => {
        if (value.startsWith(localNodeModulesPath)) {
          result[key] = value;
        }
        if (value.startsWith(`file:${localNodeModulesPath}`)) {
          result[key] = value.substring(5);
        }
        return result;
      },
      {},
    );

  for (const packageName in localPackages) {
    // ローカルパッケージの確認
    const localPackagePath = path.resolve(localPackages[packageName]);
    if (fs.existsSync(localPackagePath)) {
      // ローカルパッケージがある場合のみ処理
      const installedPackagePath = path.resolve(nodeModulesPath, packageName);
      if (!trial) {
        // コピーを行う
        if (fs.existsSync(installedPackagePath)) {
          // 古いパッケージは削除
          fs.removeSync(installedPackagePath);
        }
        // パッケージをコピー
        fs.copySync(localPackagePath, installedPackagePath);
      }
      console.info(`${packageName} is being copied...`);
    }
  }
}

export default installFromLocal;
