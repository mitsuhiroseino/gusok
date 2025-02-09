import isBoolean from 'lodash/isBoolean';
import isEqual from 'lodash/isEqual';
import { ParseOptions } from './types';

/**
 * 真偽値へのパースを行う
 * @param value 任意の値
 * @param options オプション
 * @returns
 */
export default function parse(value: any, options: ParseOptions = {}): boolean | null {
  if (isBoolean(value)) {
    return value;
  }
  const { deepEqual, trueValues, falseValues } = options,
    predicate = deepEqual ? (target) => isEqual(value, target) : (target) => value === target;
  if (trueValues) {
    return trueValues.some(predicate);
  } else if (falseValues) {
    return !falseValues.some(predicate);
  } else {
    return !!value;
  }
}
