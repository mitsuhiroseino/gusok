import isPlainObject from 'lodash-es/isPlainObject';
import set from 'lodash-es/set';
import clean from '../clean';
import { SeparateOptions } from './types';

/**
 * 判定用関数の返す文字列を基にオブジェクトまたは配列の配下の要素を再帰的に分類する。
 * @param source 配列またはオブジェクト
 * @param fn 判定用関数
 * @param options オプション
 */
export default function separate<
  S = unknown[] | { [key: PropertyKey]: unknown },
>(
  source: S,
  fn: (
    value: any,
    key: PropertyKey,
    parent: any,
    parentPath: PropertyKey[],
    level: number,
    source: S,
  ) => string | null | undefined,
  options: SeparateOptions = {},
): any {
  // 分類結果
  const result = {},
    // 判定&結果取得用コールバック
    callback = (
      value: any,
      key: PropertyKey,
      parent: any,
      parentPath: PropertyKey[],
      level: number,
    ) => {
      const classification = fn(value, key, parent, parentPath, level, source);
      if (classification) {
        // 分類された場合は対象の分類に反映
        const classifyed =
            result[classification] || (Array.isArray(source) ? [] : {}),
          path = parentPath.concat([key]);
        set(classifyed, path, value);
        result[classification] = classifyed;
        return true;
      }
      return false;
    };
  _separate(source, callback, options);
  return clean(result);
}

/**
 * sourceを分ける
 * @param source 配列またはオブジェクト
 * @param callback 判定&結果取得用コールバック
 * @param options オプション
 * @param path 現在のパス
 * @returns
 */
function _separate(
  source: any,
  callback: (
    value: any,
    key: PropertyKey,
    parent: any,
    parentPath: PropertyKey[],
    level: number,
  ) => boolean,
  options: SeparateOptions,
  path: PropertyKey[] = [],
): void {
  if (isPlainObject(source)) {
    // Objectの場合はキー&値を分類
    for (const key in source) {
      const value = source[key];
      _classifyValue(value, callback, options, key, path, source);
    }
  } else if (Array.isArray(source)) {
    // Arrayの場合は要素を分類
    const length = source.length;
    for (let i = 0; i < length; i++) {
      const value = source[i];
      _classifyValue(value, callback, options, i, path, source);
    }
  }
  return;
}

/**
 *
 * @param value 分類対象の値
 * @param callback 判定&結果取得用コールバック
 * @param options オプション
 * @param key 対象の値のキーまたはインデックス
 * @param parentPath 親要素のパス
 * @param parent 親要素
 * @returns
 */
function _classifyValue(
  value: any,
  callback: (
    value: any,
    key: PropertyKey,
    parent: any,
    parentPath: PropertyKey[],
    level: number,
  ) => boolean,
  options: SeparateOptions,
  key: PropertyKey,
  parentPath: PropertyKey[],
  parent: any,
): void {
  const { level, includeObject, includeArray } = options,
    currentLevel = parentPath.length,
    isObject = isPlainObject(value),
    isArray = Array.isArray(value);
  if (
    (!isObject && !isArray) ||
    (isObject && includeObject) ||
    (isArray && includeArray)
  ) {
    // object以外またはobjectも分類の対象の場合は判定用関数を実行
    if (callback(value, key, parent, parentPath, currentLevel)) {
      // 分類されたため当値の処理は終了
      return;
    }
  }
  // 分類されなかった場合
  if (level == null || level > currentLevel) {
    // まだ指定のレベルに達していないなら掘り進む
    _separate(value, callback, options, parentPath.concat([key]));
  }
  return;
}
