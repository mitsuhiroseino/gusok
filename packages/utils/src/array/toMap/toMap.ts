import _set from 'lodash/set';
import asArray from '../asArray';

/**
 * 配列から指定のプロパティの値をキーとしたオブジェクトを作成します。
 * @param array オブジェクト配列
 * @param properties キーとする値を持ったプロパティ
 * @param flat propertiesが複数指定されている場合にのみ有効。trueの場合はルートオブジェクト直下に全ての要素を設定する
 * @param keySeparator flat=trueの場合にのみ有効。各キーを結合するセパレーター
 * @returns
 */
export default function toMap<I>(
  array: I[],
  properties: string | string[],
  flat: boolean = false,
  keySeparator: string = '.',
): { [key: string]: I } {
  const propNames = asArray(properties),
    set = flat ? (object, keys, value) => (object[keys.join(keySeparator)] = value) : _set;
  return array.reduce((result, item) => {
    // 指定のプロパティの値を配列に取得
    const keyArray = propNames.map((propName) => {
      return item[propName];
    });
    // 指定のプロパティの値をキーとしてオブジェクトに設定
    set(result, keyArray, item);
    return result;
  }, {});
}
