import * as fs from 'fs-extra';

/**
 *
 * @param targetPaths
 * @param options
 */
function checkExistence(...targetPaths: string[]) {
  return targetPaths.every((targetPath) => {
    if (!fs.existsSync(targetPath)) {
      console.error(`${targetPath}が存在しません。`);
      return false;
    }
    return true;
  });
}

export default checkExistence;
