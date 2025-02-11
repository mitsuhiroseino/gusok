import isEmpty from 'lodash-es/isEmpty';
import isPlainObject from 'lodash-es/isPlainObject';
import isString from 'lodash-es/isString';

/**
 * null,undefined,空文字,空配列,空オブジェクトの場合にtrueを返す
 * @param value 検証対象の値
 * @returns
 */
export default function isEmptyValue(value: any): boolean {
  return (
    value == null ||
    ((isString(value) || Array.isArray(value) || isPlainObject(value)) &&
      isEmpty(value))
  );
}
