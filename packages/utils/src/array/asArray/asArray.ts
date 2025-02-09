/**
 * valueが配列でない場合、配列に変換し返却します。
 * @param value
 */
export default function asArray<T>(value: T | T[]): T[] {
  if (Array.isArray(value)) {
    return value;
  } else if (value == null) {
    return [];
  } else {
    return [value];
  }
}
