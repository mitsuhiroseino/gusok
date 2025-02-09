import get from 'lodash/get';
import has from 'lodash/has';
import extractTokens from '../extractTokens';
import replaceAll from '../replaceAll';
import { FormatOptions } from './types';

/**
 * 文字列型の値のフォーマットを行う
 * @param value テンプレート
 * @param options オプション
 * @returns
 */
export default function format(value: string, options: FormatOptions = {}): string | null {
  const { params = {}, extractTokensFn = extractTokens } = options,
    tokens = extractTokensFn(value, true),
    prefix = extractTokensFn.PREFIX,
    suffix = extractTokensFn.SUFFIX;
  let str = value;
  for (const token of tokens) {
    if (has(params, token)) {
      const value = get(params, token);
      if (value != null) {
        str = replaceAll(str, `${prefix}${token}${suffix}`, value);
      }
    }
  }
  return str;
}
