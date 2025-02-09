import isBoolean from 'lodash/isBoolean';
import isDate from 'lodash/isDate';
import isFunction from 'lodash/isFunction';
import isNumber from 'lodash/isNumber';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import map from 'lodash/map';

// TODO: blueimp-md5で使用しているstring-widthのバージョンではcjsのソースが無い為、jestで動作させることができない
// TODO: transformIgnorePatternsに指定してもうまく動作しない
// import md5 from 'blueimp-md5';

/**
 * オブジェクトや配列をハッシュ値に変換する
 * jestで動作させられない為、保留
 */
export default function hash(value: any): any {
  return _toString(value);
  //  return md5(_toString(value));
}

function _toString(value: any): any {
  if (value === undefined) {
    // undefined
    return 'undefined!$undefined';
  } else if (value === null) {
    // null
    return _toTypeValueString('null', value);
  } else if (Array.isArray(value)) {
    // 配列
    return _toTypeValueString(
      'array',
      value.map((item) => _toString(item)),
    );
  } else if (isPlainObject(value)) {
    // オブジェクト
    // [key, value]の配列形式に変換
    return _toTypeValueString(
      'object',
      map(value, (item, key) => [key, _toString(item)]).sort((item1, item2) => (item1[0] > item2[0] ? 1 : -1)),
    );
  } else if (isDate(value)) {
    // Date
    return _toTypeValueString('date', value.getTime());
  } else if (isString(value)) {
    // 文字列
    return _toTypeValueString('string', value);
  } else if (isNumber(value)) {
    // 数値
    return _toTypeValueString('number', value);
  } else if (isBoolean(value)) {
    // 真偽値
    return _toTypeValueString('boolean', value);
  } else if (isFunction(value)) {
    // 関数
    return _toTypeValueString('function', String(value));
  } else {
    // 上記以外
    return _toTypeValueString('unknown', String(value));
  }
}

/**
 * 文字列に変換する
 * @param type 型
 * @param value 値
 * @returns 文字列
 */
function _toTypeValueString(type: string, value: any) {
  return `${type}!${JSON.stringify(value)}`;
}
