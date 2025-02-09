import includes from 'lodash/includes';
import asArray from '../asArray';

/**
 * 同じ要素が配列に存在しない場合のみ要素を追加します。
 * @param array
 * @param items
 */
export default function pushUnique<T>(array: T[], items: T | T[]): T[] {
  items = asArray(items);
  for (const item of items) {
    if (!includes(array, item)) {
      array.push(item);
    }
  }
  return array;
}
