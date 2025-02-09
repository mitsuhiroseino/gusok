/**
 * イテレーターを持つインスタンスか判定します
 * @param value
 * @returns
 */
export default function isIterable(value: unknown): value is Iterable<unknown> {
  return value != null && typeof value[Symbol.iterator] === 'function';
}
