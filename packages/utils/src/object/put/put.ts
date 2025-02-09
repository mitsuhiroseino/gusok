import standardize from '../../string/standardize';
import hasOwnProperty from '../hasOwnProperty';
import { PutOptions } from './types';

/**
 * オブジェクトのキーの大文字・小文字などの違いを無視して値を設定する
 * @param object 対象のオブジェクト
 * @param key 設定先のキー
 * @param value 設定する値
 * @param options オプション
 */
export default function put(
  object: Record<string, unknown>,
  key: string,
  value: unknown,
  options?: PutOptions,
): Record<string, unknown> {
  if (object) {
    const targetKey = standardize(key, options);
    for (const objKey in object) {
      if (hasOwnProperty(object, objKey) && standardize(objKey, options) === targetKey) {
        object[objKey] = value;
        return object;
      }
    }
  }

  return object;
}
