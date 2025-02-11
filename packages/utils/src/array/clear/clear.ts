/**
 * 配列の要素を全て削除する。
 * @param array
 */
export default function clear<T>(array: T[]): T[] {
  array.length = 0;
  return array;
}
