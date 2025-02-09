import isPlainObject from 'lodash/isPlainObject';
import { ParseOptions } from './types';

/**
 * オブジェクトへのパースを行う
 * @param value 任意の値
 * @param options オプション
 * @returns
 */
export default function parse(value: any, options: ParseOptions = {}): any | null {
  if (isPlainObject(value)) {
    return value;
  }
  return JSON.parse(value, options.reviver);
}
