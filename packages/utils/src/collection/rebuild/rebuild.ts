import isPlainObject from 'lodash-es/isPlainObject';
import { RebuildOptions } from './types';

/**
 * 編集用関数の返したundefined以外の値を元にオブジェクトまたは配列を作成する。
 * 編集用関数が未指定の場合は値がundefinedの要素以外でオブジェクトまたは配列をを作成する。
 * @param source オブジェクトまたは配列
 * @param fn 値の編集用関数
 * @param options オプション
 */
export default function rebuild(
  source: any,
  fn: (item: any, key: PropertyKey | any, whole: unknown) => unknown = (
    item: any,
  ) => item,
  options?: RebuildOptions,
): any {
  return _rebuild(source, fn, options);
}

/**
 * sourceが配列、オブジェクトの場合、再構成処理をする
 * @param source 任意の値
 * @param fn 値の編集用関数
 * @param options オプション
 * @param currentLevel 現在のネストの深さ
 * @returns
 */
function _rebuild(
  source: any,
  fn: (item: any, key: PropertyKey | any, whole: unknown) => unknown = (
    item: any,
  ) => item,
  options: RebuildOptions = {},
  currentLevel = 0,
): any {
  const { level, excludeArray, excludeObject } = options;
  if (level == null || currentLevel <= level) {
    // ネストの深さの指定がない場合 or 指定の深さ以下の場合
    if (Array.isArray(source) && !excludeArray) {
      // 配列の場合
      const array: unknown[] = [],
        length = source.length;
      for (let i = 0; i < length; i++) {
        const result = fn(source[i], i, source);
        // arrayに設定
        if (result !== undefined) {
          // undefined以外は配列に追加
          array.push(_rebuild(result, fn));
        }
      }
      // 再構成した配列を返す
      return array;
    } else if (isPlainObject(source) && !excludeObject) {
      // オブジェクトの場合
      const object: { [key: PropertyKey]: unknown } = {},
        keys = Object.keys(source);
      for (const key of keys) {
        const result = fn(source[key], key, source);
        // objectに設定
        if (result !== undefined) {
          // undefined以外は項目に設定
          object[key] = _rebuild(result, fn);
        }
      }
      // 再構成したオブジェクトを返す
      return object;
    }
  }
  // 上記以外はそのまま返す
  return source;
}
