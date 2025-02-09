import getAnyKey from '../getAnyKey';

/**`
 * undefinedではない何れかの値を取得する
 * @param target
 * @param keys
 */
export default function getAnyValue<V = any>(target: any, keys: string | number | (string | number)[]): V | undefined {
  const key = getAnyKey(target, keys);
  if (key === undefined) {
    return undefined;
  } else {
    return target[key];
  }
}
