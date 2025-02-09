import isEmpty from 'lodash/isEmpty';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';

/**
 * null,undefined,空文字,空配列,空オブジェクトの場合にtrueを返す
 * @param value 検証対象の値
 * @returns
 */
export default function isEmptyValue(value: any): boolean {
  return value == null || ((isString(value) || Array.isArray(value) || isPlainObject(value)) && isEmpty(value));
}
