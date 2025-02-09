import isPlainObject from 'lodash/isPlainObject';
import toArray from 'lodash/toArray';
import isIterable from '../../lang/isIterable';

/**
 * 配列、オブジェクトの場合はその要素毎にfnを実行する
 * fnがundefined以外を返した時点で処理を終了する
 * 配列、オブジェクト以外の場合は何も行わない
 * @param items
 * @param fn
 */
export default function each(items: any, fn: (item: unknown, key?: PropertyKey | any, items?: any) => any | void): any {
  if (isIterable(items)) {
    items = toArray(items);
  }
  if (Array.isArray(items)) {
    // 配列などのiterableなものの場合
    for (const index in items) {
      const result = fn(items[index], Number(index), items);
      if (result !== undefined) {
        return result;
      }
    }
  } else if (isPlainObject(items)) {
    // オブジェクトの場合
    const keys = Object.keys(items);
    for (const key of keys) {
      const result = fn(items[key], key, items);
      if (result !== undefined) {
        return result;
      }
    }
  }
}
