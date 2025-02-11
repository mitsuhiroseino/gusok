import fs from 'fs-extra';
import path from 'path';

/**
 * 対象のディレクトリ直下のファイルを、拡張子を除いた同名のサブディレクトリ直下に移動する
 * @param dirPath 対象のディレクトリのパス
 */
export default async function moveFilesToSubdir(dirPath: string) {
  const items = await fs.readdir(dirPath);
  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);
    if (stat.isFile()) {
      const fileName = path.parse(item).name;
      // 移動先のディレクトリパスを生成
      const subdirPath = path.join(dirPath, fileName);
      // 移動先のディレクトリが存在しなければ作成
      fs.ensureDirSync(subdirPath);
      // 移動先のファイルパスを生成
      fs.moveSync(itemPath, path.join(subdirPath, item));
    }
  }
}
