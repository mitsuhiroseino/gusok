import fs from 'fs-extra';
import path from 'path';
import { VerOptions } from './types';

/**
 * パッケージのバージョンを反映する
 * @param pkg パッケージ
 * @param options オプション
 */
export default async function ver(ver: string, options: VerOptions = {}) {
  const {
    workspacePackageJsonPath = 'package.json',
    packagesPath = 'packages',
  } = options;

  if (fs.existsSync(workspacePackageJsonPath)) {
    // ワークスペースのpackage.jsonを更新
    _updatePkgJson(ver, workspacePackageJsonPath);
  }
  const pkgs = fs.readdirSync(packagesPath);
  for (const pkg of pkgs) {
    const packagePath = path.join(packagesPath, pkg);
    const packageJsonPath = path.join(packagePath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      // 各パッケージのpackage.jsonを更新
      _updatePkgJson(ver, packageJsonPath);
    }
  }
}

function _updatePkgJson(ver: string, packageJsonPath: string) {
  const packageJson = fs.readJsonSync(packageJsonPath, { encoding: 'utf8' });
  packageJson.version = ver;
  fs.writeJsonSync(packageJsonPath, packageJson, {
    encoding: 'utf8',
    spaces: 2,
  });
}
