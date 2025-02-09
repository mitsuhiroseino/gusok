import isBoolean from 'lodash/isBoolean';
import isDate from 'lodash/isDate';
import isFunction from 'lodash/isFunction';
import isNumber from 'lodash/isNumber';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import { NO_VALUE, VALUE_TYPE } from './constants';
import { ValueType } from './types';

/**
 * 簡易的な型判定を行う
 * @param value 任意の値
 * @param options オプション
 * @returns
 */
export default function typeOf(value: unknown): ValueType {
  switch (true) {
    case value === NO_VALUE:
      return VALUE_TYPE.NO_TYPE;
    case value === undefined:
      return VALUE_TYPE.UNDEFINED;
    case value === null:
      return VALUE_TYPE.NULL;
    case isString(value):
      return VALUE_TYPE.STRING;
    case isNumber(value):
      return VALUE_TYPE.NUMBER;
    case isBoolean(value):
      return VALUE_TYPE.BOOLEAN;
    case isDate(value):
      return VALUE_TYPE.DATE;
    case Array.isArray(value):
      return VALUE_TYPE.ARRAY;
    case isPlainObject(value):
      return VALUE_TYPE.OBJECT;
    case isFunction(value):
      return VALUE_TYPE.FUNCTION;
    default:
      return VALUE_TYPE.UNKNOWN;
  }
}
