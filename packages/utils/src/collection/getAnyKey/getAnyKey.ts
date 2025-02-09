import asArray from '../../array/asArray';

/**`
 * undefinedではない値を持つ何れかのキーを取得する
 * @param target
 * @param keys
 */
export default function getAnyKey(
  target: any,
  keys: string | number | (string | number)[],
): string | number | undefined {
  const keyList = asArray(keys);
  for (const key of keyList) {
    const value = target[key];
    if (value !== undefined) {
      return key;
    }
  }
  return undefined;
}
