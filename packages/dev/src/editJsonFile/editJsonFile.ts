import * as fs from 'fs-extra';
import isFunction from 'lodash/isFunction';
import merge from 'lodash/merge';
import * as path from 'path';
import checkExistence from '../checkExistence';

/**
 * JSONファイルを更新する
 * @param jsonFilePath
 * @param editor
 */
function editJsonFile(jsonFilePath: string, editor: ((obj: any) => any) | any) {
  const resolvedJsonFilePath = path.resolve(jsonFilePath);
  if (checkExistence(resolvedJsonFilePath)) {
    const obj = fs.readJSONSync(resolvedJsonFilePath);
    let editedJson;
    if (isFunction(editor)) {
      // 関数で編集する場合
      editedJson = editor(obj);
    } else {
      // 差分を反映する場合
      editedJson = merge(obj, editor);
    }
    fs.writeJSONSync(resolvedJsonFilePath, editedJson, { spaces: 2 });
  }
}

export default editJsonFile;
