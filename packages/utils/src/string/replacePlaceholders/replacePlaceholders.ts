import get from 'lodash/get';
import escapeForRegex from '../escapeForRegex';
import { ReplacePlaceholdersOptions } from './types';

const getShallow = (values, key) => values[key];

/**
 * template内のvaluesのキーを`{{`,`}}`で括った文字列と一致するプレイスホルダーをvaluesのプロパティの値で置換する
 * @param template テンプレート文字列
 * @param values 置換対象の値
 * @param options オプション
 * @returns
 */
export default function replacePlaceholders(
  template: string,
  values: { [key: string]: any } | any[],
  options: ReplacePlaceholdersOptions = {},
): string {
  const { bracket = ['{{', '}}'], removePlaceholders, flatKeys } = options,
    // valuesから値を取得する関数
    getValue = flatKeys ? getShallow : get,
    // 取得した値がnull,undefinedだった時の値を取得する関数
    getFallbackValue = removePlaceholders
      ? // 値がnull,undefinedの場合は空文字で置換
        (match) => ''
      : // プレイスホルダーを残す
        (match) => match,
    l = escapeForRegex(bracket[0]),
    r = escapeForRegex(bracket[1]),
    pattern = `${l}(.*?)${r}`,
    regex = new RegExp(pattern, 'g');

  return template.replace(regex, (match, key) => {
    const value = getValue(values, key);
    if (value != null) {
      return value;
    } else {
      // 値がnull,undefinedの場合に返す値を取得
      return getFallbackValue(match);
    }
  });
}
