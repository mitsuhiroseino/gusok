/**
 * 値がプリミティブか判定します
 * @param value 値
 * @returns
 */
export default function isPrimitive(value: unknown): boolean {
  if (value == null) {
    return true;
  }
  const type = typeof value;
  return type !== 'object' && type !== 'function';
}
