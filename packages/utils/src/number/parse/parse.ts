import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import { ParseOptions } from './types';

/**
 * 数値へのパースを行う
 * @param value 任意の値
 * @param options オプション
 * @returns
 */
export default function parse(value: any, options: ParseOptions = {}): number | null {
  if (isNumber(value)) {
    return value;
  }
  if (isString(value)) {
    const { thousandsSeparator = ',', decimalPoint = '.' } = options;
    return Number(value.replaceAll(thousandsSeparator, '').replaceAll(decimalPoint, '.'));
  }
  return Number(value);
}
