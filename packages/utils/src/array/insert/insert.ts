import asArray from '../asArray';
import pushAll from '../pushAll';

/**
 * 配列の指定の位置に要素を追加します。
 * @param array
 * @param index
 * @param item
 */
export default function insert<T>(array: T[], items: T | T[], index?: number): T[] {
  if (array) {
    items = asArray(items);
    if (index == null) {
      pushAll(array, items);
    } else {
      index = Math.max(0, index);
      array.splice(index, 0, ...items);
    }
  }
  return array;
}
