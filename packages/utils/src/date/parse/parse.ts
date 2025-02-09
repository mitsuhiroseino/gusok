import isMatch from 'date-fns/isMatch';
import parseDateString from 'date-fns/parse';
import isDate from 'lodash/isDate';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import asArray from '../../array/asArray';
import toUTC from '../toUTC';
import { ParseOptions } from './types';

const FORMATS = [
  'yyyy/MM/dd HH:mm:ss.SSS',
  'yyyy/MM/dd HH:mm:ss',
  'yyyy/MM/dd HH:mm',
  'yyyy/MM/dd HH',
  'yyyy/MM/dd',
  'yyyy/MM',
  'yyyy',
];

/**
 * 日時文字列のパースを行う
 * 指定されたフォーマットに一致しない場合はnullを返す
 * @param value 日時文字列
 * @param options オプション
 * @returns
 */
export default function parse(value: any, options: ParseOptions = {}): Date | null {
  if (isDate(value)) {
    // 日付型
    return value;
  } else if (isNumber(value)) {
    // 数値型
    return new Date(value);
  } else if (isString(value)) {
    // 文字列型
    const { formats = FORMATS, referenceDate = 0, utc, ...dateFnsOptions } = options;
    for (const format of asArray(formats)) {
      if (isMatch(value, format, dateFnsOptions)) {
        // 対象のフォーマットに一致するもののみ変換
        const date = parseDateString(value, format, referenceDate, dateFnsOptions);
        if (utc) {
          return toUTC(date);
        } else {
          return date;
        }
      }
    }
  }
  // 上記以外
  return null;
}
