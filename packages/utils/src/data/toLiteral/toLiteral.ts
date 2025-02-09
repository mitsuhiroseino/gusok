import isBoolean from 'lodash/isBoolean';
import isDate from 'lodash/isDate';
import isFunction from 'lodash/isFunction';
import isNumber from 'lodash/isNumber';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import formatDate from '../../date/format';
import isIterable from '../../lang/isIterable';
import { ToLiteralInternalOptions, ToLiteralOptions } from './types';

/**
 * "'"でくくる必要があるキー
 * 英文字で始まらない or "."を含むもの
 */
const REGEXP_REQUIRES_ENCLOSURE = /^[^a-zA-Z_]|[^0-9a-zA-Z_]/;

/**
 * 出力しない値
 */
const OMIT = Symbol('OMIT');

/**
 * オブジェクトリテラル形式の文字列化
 * @param target 文字列化対象
 * @param options オプション
 */
export default function toLiteral(target: unknown, options: ToLiteralOptions = {}): string {
  const { formatting, indent, lineSeparator, separatorSpace, ...rest } = options,
    opts = rest as ToLiteralInternalOptions;

  let defaultIndent, defaultLineSeparator, defaultSeparatorSpace;
  if (formatting) {
    defaultIndent = '    ';
    defaultLineSeparator = '\r\n';
    defaultSeparatorSpace = ' ';
  } else {
    defaultIndent = '';
    defaultLineSeparator = '';
    defaultSeparatorSpace = '';
  }
  opts.indent = isNumber(indent) ? ' '.repeat(indent) : defaultIndent;
  opts.lineSeparator = lineSeparator != null ? lineSeparator : defaultLineSeparator;
  opts.separatorSpace = isNumber(separatorSpace) ? ' '.repeat(separatorSpace) : defaultSeparatorSpace;
  opts.level = 0;

  const literal = _toLiteral(target, opts);
  return isString(literal) ? literal : '';
}

function _toLiteral(target: unknown, options: ToLiteralInternalOptions): string | Symbol {
  let str: string | Symbol;

  const { indent, level } = options,
    baseIndent = indent.repeat(level),
    isLimited = options.limit != null && options.limit < level;

  if (target === undefined) {
    // undefinedの場合
    const undefinedOutput = options.undefinedOutput;
    if (undefinedOutput === 'omit') {
      str = OMIT;
    } else if (undefinedOutput === 'null') {
      str = 'null';
    } else {
      str = 'undefined';
    }
  } else if (target === null) {
    // nullの場合
    const nullOutput = options.nullOutput;
    if (nullOutput === 'omit') {
      str = OMIT;
    } else if (nullOutput === 'undefined') {
      str = 'undefined';
    } else {
      str = 'null';
    }
  } else if (isString(target)) {
    // 文字列の場合
    str = `'${target}'`;
  } else if (isNumber(target)) {
    // 数値の場合
    str = String(target);
  } else if (isBoolean(target)) {
    // 真偽値の場合
    str = String(target);
  } else if (isDate(target)) {
    // 日付の場合
    const dateFormat = options.dateFormat;
    if (dateFormat == null) {
      // フォーマットの指定がない場合はtoISOString
      str = `'${target.toISOString()}'`;
    } else {
      // フォーマットの指定がある場合は日付を変換し取得
      str = `'${formatDate(target, { format: dateFormat })}'`;
    }
  } else if (Array.isArray(target)) {
    // 配列の場合
    if (isLimited) {
      // 上限に達した場合
      str = `'[${getTypeName(target)}]...'`;
    } else {
      // 上限に達していない場合
      const array: unknown[] = target;
      str = _toArrayLiteral(array, { ...options, baseIndent });
    }
  } else if (isPlainObject(target)) {
    // オブジェクトの場合
    if (isLimited) {
      // 上限に達した場合
      str = `'[${typeof target}]...'`;
    } else {
      // 上限に達していない場合
      const object = target as { [key: string]: unknown };
      str = _toObjectLiteral(object, { ...options, baseIndent });
    }
  } else if (target instanceof Map) {
    // Mapの場合
    if (isLimited) {
      // 上限に達した場合
      str = `'[${getTypeName(target)}]...'`;
    } else {
      // 上限に達していない場合
      const mapOutput = options.mapOutput;
      if (mapOutput === 'omit') {
        str = OMIT;
      } else if (mapOutput === 'type') {
        str = `'[${getTypeName(target)}]'`;
      } else {
        const map = target as Map<string, unknown>,
          object = {};
        map.forEach((value, key) => {
          object[key] = value;
        });
        str = _toObjectLiteral(object, { ...options, baseIndent });
      }
    }
  } else if (isIterable(target)) {
    // Iterableの場合
    if (isLimited) {
      // 上限に達した場合
      str = `'[${getTypeName(target)}]...'`;
    } else {
      // 上限に達していない場合
      const iterableOutput = options.iterableOutput;
      if (iterableOutput === 'omit') {
        str = OMIT;
      } else if (iterableOutput === 'type') {
        str = `'[${getTypeName(target)}]'`;
      } else {
        const set = target as Set<unknown>,
          array = Array.from(set);
        str = _toArrayLiteral(array, { ...options, baseIndent });
      }
    }
  } else if (isFunction(target)) {
    // 関数の場合
    const functionOutput = options.functionOutput;
    if (functionOutput === 'omit') {
      str = OMIT;
    } else if (functionOutput === 'type') {
      // 関数は[function]を出力する場合
      str = `'[${typeof target}]'`;
    } else {
      str = `'${String(target)}'`;
    }
  } else {
    // 上記以外の場合
    const constructor = target.constructor;
    if (constructor) {
      // 何らかのクラスのインスタンス
      const instanceOutput = options.instanceOutput;
      if (instanceOutput === 'type') {
        str = `'[${getTypeName(target)}]'`;
      } else if (instanceOutput === 'omit') {
        str = OMIT;
      } else {
        str = `'${String(target)}'`;
      }
    } else {
      // 何かしらの値
      str = `'${String(target)}'`;
    }
  }
  return str;
}

/**
 * 配列の文字列化
 * @param array
 * @param options
 * @returns
 */
function _toArrayLiteral(array: unknown[], options: ToLiteralInternalOptions) {
  const { baseIndent, indent, lineSeparator, level } = options;
  // 配列の場合
  const length = array.length,
    last = length - 1;
  let str = `[${lineSeparator}`;
  // 子要素に渡すoptionsを作成
  const opts = { ...options, level: level + 1 };
  for (let index = 0; index < length; index++) {
    const item = array[index],
      result = _toLiteral(item, opts);
    if (result !== OMIT) {
      // 出力する場合
      str += `${baseIndent}${indent}${result}`;
      if (index !== last) {
        // 最後の要素以外には末尾に','を付ける
        str += ',';
      }
      str += lineSeparator;
    }
  }
  str += `${baseIndent}]`;
  return str;
}

/**
 * オブジェクトの文字列化
 * @param object
 * @param options
 * @returns
 */
function _toObjectLiteral(object: { [key: string]: unknown }, options: ToLiteralInternalOptions) {
  const { baseIndent, indent, lineSeparator, separatorSpace, level, sortByKey } = options;
  // オブジェクトの場合
  const rawKeys = Object.keys(object),
    keys = sortByKey ? rawKeys.sort((a, b) => (a > b ? 1 : -1)) : rawKeys,
    length = keys.length,
    last = length - 1;
  let str = `{${lineSeparator}`;
  // 子要素に渡すoptionsを作成
  const opts = { ...options, level: level + 1 };
  for (let index = 0; index < length; index++) {
    let key = keys[index];
    const value: unknown = object[key],
      result = _toLiteral(value, opts);
    if (result !== OMIT) {
      // 出力する場合
      if (REGEXP_REQUIRES_ENCLOSURE.test(key)) {
        key = `'${key}'`;
      }
      str += `${baseIndent}${indent}${key}:${separatorSpace}${result}`;
      if (index !== last) {
        // 最後の要素以外には末尾に','を付ける
        str += ',';
      }
      str += lineSeparator;
    }
  }
  str += `${baseIndent}}`;
  return str;
}

/**
 * 型名を取得
 * @param target
 * @returns
 */
function getTypeName(target: unknown): string {
  const type = typeof target;
  if (type === 'object') {
    return (target as any).constructor?.name || type;
  } else {
    return type;
  }
}
