import isPlainObject from 'lodash/isPlainObject';
import { FlattenOptions } from './types';

/**
 * 配下のオブジェクトも含めてキーをフラットな状態に変換したオブジェクトを返します
 * @param object
 * @param options
 */
export default function flatten(object: any, options: FlattenOptions = {}): any {
  return _flatten(object, options);
}

function _flatten(object: any, options: FlattenOptions, parentPath?: string): any {
  if (isPlainObject(object) || (Array.isArray(object) && !options.ignoreArray)) {
    // オブジェクトの場合は配下要素をフラットな状態に変換
    let flatObj: { [key: string]: unknown } = {},
      currentPath: string;
    const { noPathKeys = false, keySeparator = '.' } = options,
      keys = Object.keys(object);

    for (const key of keys) {
      const value: unknown = object[key];
      // キー名
      if (parentPath && !noPathKeys) {
        // ネストしたキー名
        currentPath = parentPath + keySeparator + key;
      } else {
        currentPath = key;
      }
      const flatItems: unknown = _flatten(value, options, currentPath);
      if (isPlainObject(flatItems)) {
        // flattenedがobjectectの場合はflatにする為にマージする
        flatObj = Object.assign(flatObj, flatItems);
      } else {
        // objectect以外はそのまま設定
        flatObj[currentPath] = flatItems;
      }
    }
    return flatObj;
  } else {
    // 上記以外はそのまま
    return object;
  }
}
