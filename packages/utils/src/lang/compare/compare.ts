import isBoolean from 'lodash/isBoolean';
import isDate from 'lodash/isDate';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import compareArray from '../../array/compare';
import compareBoolean from '../../boolean/compare';
import compareDate from '../../date/compare';
import compareNumber from '../../number/compare';
import compareString from '../../string/compare';
import preCompare from '../preCompare';
import { CompareOptions } from './types';

/**
 * 値の比較を行う
 * @param value1 比較対象1
 * @param value2 比較対象2
 * @param options オプション
 * @returns 比較結果
 */
export default function compare(value1: any, value2: any, options: CompareOptions = {}): number {
  const { booleanOptions, dateOptions, numberOptions, stringOptions, ...rest } = options;

  // 事前にundefined,nullの為の比較を行う
  const preResult = preCompare(value1, value2, rest);
  if (preResult !== undefined) {
    return preResult;
  }

  // null、undefined以外の比較
  switch (true) {
    case isBoolean(value1) && isBoolean(value2):
      return compareBoolean(value1, value2, booleanOptions);
    case isDate(value1) && isDate(value2):
      return compareDate(value1, value2, dateOptions);
    case isNumber(value1) && isNumber(value2):
      return compareNumber(value1, value2, numberOptions);
    case isString(value1) && isString(value2):
      return compareString(value1, value2, stringOptions);
    case Array.isArray(value1) && Array.isArray(value2):
      return compareArray(value1, value2, options);
    default:
      return 0;
  }
}
