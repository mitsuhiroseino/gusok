import fs from 'fs-extra';
import path from 'path';

export default async function moveFilesToSubdir(dirPath: string) {
  const items = await fs.readdir(dirPath);
  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stats = fs.statSync(itemPath);
    if (stats.isFile()) {
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
