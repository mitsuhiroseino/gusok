import isEmpty from 'lodash/isEmpty';
import asArray from '../asArray';

/**
 * 配列の全ての要素を別の配列に追加します。
 * 追加先配列がない場合は新しい配列を返します。
 * @param array 追加先配列
 * @param items 追加する要素を持つ配列
 * @returns 要素を追加した配列
 */
export default function pushAll<T>(array: T[], items: T | T[]): T[] {
  items = asArray(items);
  const target: T[] = array || [];
  if (!isEmpty(items)) {
    target.push.apply(target, items);
  }
  return target;
}
