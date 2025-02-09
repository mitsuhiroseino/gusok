import isPlainObject from 'lodash/isPlainObject';
import _remove from 'lodash/remove';

/**
 * lodashのremoveの拡張。predicateへ削除したいプロパティ値を持つオブジェクトを渡すことができる
 * @param array
 * @param predicate
 */
export default function remove<T>(array: T[], predicate: any): T[] {
  if (isPlainObject(predicate)) {
    const values = predicate,
      keys = Object.keys(values);
    predicate = keys.length ? (item: any) => keys.every((key) => values[key] === item[key]) : () => false;
  }
  return _remove(array, predicate);
}
